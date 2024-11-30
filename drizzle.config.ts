import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/db/schema',
  out: './src/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL
  },
  verbose: true,
  strict: true
});
