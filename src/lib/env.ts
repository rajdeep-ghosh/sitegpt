import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const LIVE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.VERCEL_ENV === 'production'
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : `https://${process.env.VERCEL_BRANCH_URL}`
    : 'http://localhost:3000';

export const env = createEnv({
  server: {
    DB_URL: z.string().min(1),
    DB_POOL_URL: z.string().min(1),
    VC_URL: z.string().min(1),
    VC_TOKEN: z.string().min(1),
    KV_URL: z.string().min(1),
    KV_TOKEN: z.string().min(1),
    RL_URL: z.string().min(1),
    RL_TOKEN: z.string().min(1)
  },
  client: {
    NEXT_PUBLIC_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1)
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL ?? LIVE_URL,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL
  }
});
