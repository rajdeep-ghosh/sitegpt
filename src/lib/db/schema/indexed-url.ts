import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const indexedUrls = pgTable('indexed_urls', {
  id: serial('id').primaryKey(),
  url: text('url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});
