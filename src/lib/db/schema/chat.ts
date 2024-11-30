import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('user_id', { length: 256 }).notNull(),
  siteTitle: text('site_title').notNull(),
  siteUrl: text('site_url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});
