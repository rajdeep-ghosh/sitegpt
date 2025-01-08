import { Redis } from '@upstash/redis';
import { drizzle } from 'drizzle-orm/neon-http';

import { env } from '@/lib/env';

import * as schema from './schema';

export const db = drizzle(env.DB_POOL_URL, { schema });

export const kv = new Redis({
  url: env.KV_URL,
  token: env.KV_TOKEN
});

export const rl = new Redis({
  url: env.RL_URL,
  token: env.RL_TOKEN
});
