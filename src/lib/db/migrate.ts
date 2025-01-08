import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

import { env } from '@/lib/env';

const migrationClient = neon(env.DB_URL);

async function main() {
  const db = drizzle(migrationClient);
  await migrate(db, { migrationsFolder: 'src/lib/db/migrations' });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
