import { Redis } from '@upstash/redis';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';

const db = drizzle(process.env.DB_POOL_URL, { schema });

export const kv = new Redis({
  url: process.env.KV_URL,
  token: process.env.KV_TOKEN
});

export const rl = new Redis({
  url: process.env.RL_URL,
  token: process.env.RL_TOKEN
});

export default db;
