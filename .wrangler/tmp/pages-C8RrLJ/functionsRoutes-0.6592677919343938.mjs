import { onRequestGet as __api_admin_analytics_ts_onRequestGet } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\admin\\analytics.ts"
import { onRequestGet as __api_v1_city_ts_onRequestGet } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\v1\\city.ts"
import { onRequestOptions as __api_v1_city_ts_onRequestOptions } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\v1\\city.ts"
import { onRequestGet as __api_v1_compare_ts_onRequestGet } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\v1\\compare.ts"
import { onRequestOptions as __api_v1_compare_ts_onRequestOptions } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\v1\\compare.ts"
import { onRequestGet as __api_v1_minimum_wage_ts_onRequestGet } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\v1\\minimum-wage.ts"
import { onRequestOptions as __api_v1_minimum_wage_ts_onRequestOptions } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\v1\\minimum-wage.ts"
import { onRequestGet as __api_v1_salary_ts_onRequestGet } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\v1\\salary.ts"
import { onRequestOptions as __api_v1_salary_ts_onRequestOptions } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\v1\\salary.ts"
import { onRequestOptions as __api_contact_ts_onRequestOptions } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\contact.ts"
import { onRequestPost as __api_contact_ts_onRequestPost } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\contact.ts"
import { onRequestOptions as __api_lead_capture_ts_onRequestOptions } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\lead-capture.ts"
import { onRequestPost as __api_lead_capture_ts_onRequestPost } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\lead-capture.ts"
import { onRequestOptions as __api_partner_apply_ts_onRequestOptions } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\partner-apply.ts"
import { onRequestPost as __api_partner_apply_ts_onRequestPost } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\partner-apply.ts"
import { onRequestOptions as __api_subscribe_ts_onRequestOptions } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\subscribe.ts"
import { onRequestPost as __api_subscribe_ts_onRequestPost } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\subscribe.ts"
import { onRequestOptions as __api_track_activity_ts_onRequestOptions } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\track-activity.ts"
import { onRequestPost as __api_track_activity_ts_onRequestPost } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\track-activity.ts"
import { onRequest as __api_detect_locale_ts_onRequest } from "C:\\Users\\POMPA\\Desktop\\Claude 1\\eurosalary\\functions\\api\\detect-locale.ts"

export const routes = [
    {
      routePath: "/api/admin/analytics",
      mountPath: "/api/admin",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_analytics_ts_onRequestGet],
    },
  {
      routePath: "/api/v1/city",
      mountPath: "/api/v1",
      method: "GET",
      middlewares: [],
      modules: [__api_v1_city_ts_onRequestGet],
    },
  {
      routePath: "/api/v1/city",
      mountPath: "/api/v1",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_v1_city_ts_onRequestOptions],
    },
  {
      routePath: "/api/v1/compare",
      mountPath: "/api/v1",
      method: "GET",
      middlewares: [],
      modules: [__api_v1_compare_ts_onRequestGet],
    },
  {
      routePath: "/api/v1/compare",
      mountPath: "/api/v1",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_v1_compare_ts_onRequestOptions],
    },
  {
      routePath: "/api/v1/minimum-wage",
      mountPath: "/api/v1",
      method: "GET",
      middlewares: [],
      modules: [__api_v1_minimum_wage_ts_onRequestGet],
    },
  {
      routePath: "/api/v1/minimum-wage",
      mountPath: "/api/v1",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_v1_minimum_wage_ts_onRequestOptions],
    },
  {
      routePath: "/api/v1/salary",
      mountPath: "/api/v1",
      method: "GET",
      middlewares: [],
      modules: [__api_v1_salary_ts_onRequestGet],
    },
  {
      routePath: "/api/v1/salary",
      mountPath: "/api/v1",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_v1_salary_ts_onRequestOptions],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_contact_ts_onRequestOptions],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_ts_onRequestPost],
    },
  {
      routePath: "/api/lead-capture",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_lead_capture_ts_onRequestOptions],
    },
  {
      routePath: "/api/lead-capture",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_lead_capture_ts_onRequestPost],
    },
  {
      routePath: "/api/partner-apply",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_partner_apply_ts_onRequestOptions],
    },
  {
      routePath: "/api/partner-apply",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_partner_apply_ts_onRequestPost],
    },
  {
      routePath: "/api/subscribe",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_subscribe_ts_onRequestOptions],
    },
  {
      routePath: "/api/subscribe",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_subscribe_ts_onRequestPost],
    },
  {
      routePath: "/api/track-activity",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_track_activity_ts_onRequestOptions],
    },
  {
      routePath: "/api/track-activity",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_track_activity_ts_onRequestPost],
    },
  {
      routePath: "/api/detect-locale",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_detect_locale_ts_onRequest],
    },
  ]