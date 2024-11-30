import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';

const db = drizzle(process.env.DB_POOL_URL, { schema });

export default db;
