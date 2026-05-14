// Quick connectivity test for Supabase. Run with: node scripts/test-supabase.mjs
// Loads .env.local manually since this runs outside of Vite.

import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split('\n')
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const idx = line.indexOf('=');
      return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
    }),
);

const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env.local');
  process.exit(1);
}

console.log('URL:', url);
console.log('Key prefix:', key.slice(0, 20) + '...');

const supabase = createClient(url, key);

// Tries to fetch the current user (anonymous = null, but the call itself should succeed)
const { data, error } = await supabase.auth.getSession();

if (error) {
  console.error('❌ Connection failed:', error.message);
  process.exit(1);
}

console.log('✅ Supabase reachable. Session:', data.session ? 'active' : 'none (anonymous, expected)');
