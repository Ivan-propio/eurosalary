// Insert blog post 1 into blog-posts.ts
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generate the blog post content
const postContent = execSync('node ' + join(__dirname, 'generate-blog-post-1.mjs'), { encoding: 'utf-8' });

// Read the current file
const filePath = join(__dirname, '..', 'src', 'data', 'blog-posts.ts');
let fileContent = readFileSync(filePath, 'utf-8');

// Replace the empty array with array containing the post
fileContent = fileContent.replace(
  'export const blogPosts: BlogPost[] = [];',
  `export const blogPosts: BlogPost[] = [\n${postContent}\n];`
);

writeFileSync(filePath, fileContent, 'utf-8');
console.log('Blog post 1 inserted successfully!');
