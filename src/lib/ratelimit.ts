import { Ratelimit } from '@upstash/ratelimit';

import { rl } from '@/lib/db';

export const ratelimit = {
  chat: {
    create: new Ratelimit({
      redis: rl,
      prefix: 'sitegpt-ratelimit:chat:create',
      analytics: true,
      limiter: Ratelimit.slidingWindow(4, '1h') // 4 requests per hour
    }),
    read: new Ratelimit({
      redis: rl,
      prefix: 'sitegpt-ratelimit:chat:read',
      analytics: true,
      limiter: Ratelimit.slidingWindow(30, '1m') // 30 requests per minute
    }),
    update: new Ratelimit({
      redis: rl,
      prefix: 'sitegpt-ratelimit:chat:update',
      analytics: true,
      limiter: Ratelimit.slidingWindow(30, '1m') // 30 requests per minute
    }),
    delete: new Ratelimit({
      redis: rl,
      prefix: 'sitegpt-ratelimit:chat:delete',
      analytics: true,
      limiter: Ratelimit.slidingWindow(30, '1m') // 30 requests per minute
    })
  },
  messages: new Ratelimit({
    redis: rl,
    prefix: 'sitegpt-ratelimit:messages',
    analytics: true,
    limiter: Ratelimit.slidingWindow(30, '1m') // 30 requests per minute
  }),
  stream: new Ratelimit({
    redis: rl,
    prefix: 'sitegpt-ratelimit:stream',
    analytics: true,
    limiter: Ratelimit.slidingWindow(120, '10m') // 120 requests per 10 minute
  })
};
