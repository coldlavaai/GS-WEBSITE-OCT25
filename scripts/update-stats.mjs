import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'kpz3fwyf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

// Query current data
const about = await client.fetch('*[_type == "aboutSection"][0]{_id, heading, content, stats}');
console.log('ABOUT:', JSON.stringify(about, null, 2));

const hero = await client.fetch('*[_type == "heroSection"][0]{_id, stats}');
console.log('HERO:', JSON.stringify(hero, null, 2));
