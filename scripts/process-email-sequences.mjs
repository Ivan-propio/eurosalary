#!/usr/bin/env node
// Process CRM email sequences — runs every hour via GitHub Actions
// Queries active enrollments due for sending, sends via Resend, advances steps

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY || !RESEND_API_KEY) {
  console.error('Missing required environment variables: SUPABASE_URL, SUPABASE_KEY, RESEND_API_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const resend = new Resend(RESEND_API_KEY);

function replacePlaceholders(template, lead) {
  return template
    .replace(/\{name\}/g, lead.name || 'there')
    .replace(/\{company\}/g, lead.company || 'your company')
    .replace(/\{country\}/g, (lead.interested_countries && lead.interested_countries[0]) || 'Europe')
    .replace(/\{email\}/g, lead.email || '');
}

async function main() {
  const now = new Date().toISOString();
  console.log(`[${now}] Processing email sequences...`);

  // 1. Get all active enrollments that are due
  const { data: enrollments, error: enrollErr } = await supabase
    .from('crm_sequence_enrollments')
    .select(`
      id,
      lead_id,
      sequence_id,
      current_step,
      crm_leads (id, name, email, company, interested_countries, language),
      crm_email_sequences (id, name)
    `)
    .eq('status', 'active')
    .lte('next_send_at', now);

  if (enrollErr) {
    console.error('Failed to fetch enrollments:', enrollErr.message);
    process.exit(1);
  }

  if (!enrollments || enrollments.length === 0) {
    console.log('No enrollments due for sending. Done.');
    process.exit(0);
  }

  console.log(`Found ${enrollments.length} enrollment(s) to process.`);

  let sent = 0;
  let failed = 0;
  let completed = 0;

  for (const enrollment of enrollments) {
    const lead = enrollment.crm_leads;
    if (!lead || !lead.email) {
      console.warn(`Enrollment ${enrollment.id}: no lead data, skipping.`);
      continue;
    }

    const nextStepOrder = enrollment.current_step + 1;

    // 2. Get the next step in the sequence
    const { data: step, error: stepErr } = await supabase
      .from('crm_sequence_steps')
      .select('id, step_order, subject_template, body_html, delay_hours')
      .eq('sequence_id', enrollment.sequence_id)
      .eq('step_order', nextStepOrder)
      .single();

    if (stepErr || !step) {
      // No more steps — mark as completed
      await supabase
        .from('crm_sequence_enrollments')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', enrollment.id);
      completed++;
      console.log(`Enrollment ${enrollment.id}: sequence completed (no step ${nextStepOrder}).`);
      continue;
    }

    // 3. Build and send email
    const subject = replacePlaceholders(step.subject_template, lead);
    const html = replacePlaceholders(step.body_html, lead);

    try {
      await resend.emails.send({
        from: 'EuroSalary.eu <hello@eurosalary.eu>',
        to: lead.email,
        subject,
        html,
      });

      console.log(`Enrollment ${enrollment.id}: sent step ${nextStepOrder} to ${lead.email}`);
      sent++;

      // 4. Check if there's a next step after this one
      const { data: nextStep } = await supabase
        .from('crm_sequence_steps')
        .select('step_order, delay_hours')
        .eq('sequence_id', enrollment.sequence_id)
        .eq('step_order', nextStepOrder + 1)
        .maybeSingle();

      if (nextStep) {
        // Advance to next step
        const nextSendAt = new Date(Date.now() + nextStep.delay_hours * 60 * 60 * 1000).toISOString();
        await supabase
          .from('crm_sequence_enrollments')
          .update({
            current_step: nextStepOrder,
            next_send_at: nextSendAt,
          })
          .eq('id', enrollment.id);
      } else {
        // This was the last step
        await supabase
          .from('crm_sequence_enrollments')
          .update({
            current_step: nextStepOrder,
            status: 'completed',
            completed_at: new Date().toISOString(),
          })
          .eq('id', enrollment.id);
        completed++;
        console.log(`Enrollment ${enrollment.id}: sequence completed after step ${nextStepOrder}.`);
      }

      // 5. Log activity
      await supabase.from('crm_activities').insert({
        lead_id: lead.id,
        activity_type: 'email_sent',
        subject: `Sequence email: ${subject}`,
        metadata: {
          sequence_id: enrollment.sequence_id,
          sequence_name: enrollment.crm_email_sequences?.name,
          step_order: nextStepOrder,
          step_id: step.id,
        },
      });
    } catch (sendErr) {
      // Send failed — don't advance step, will retry next hour
      console.error(`Enrollment ${enrollment.id}: send failed for ${lead.email}:`, sendErr.message || sendErr);
      failed++;
    }
  }

  console.log(`\nDone. Sent: ${sent}, Failed: ${failed}, Completed: ${completed}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
