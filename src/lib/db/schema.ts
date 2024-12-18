import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

export const indexedUrlsTable = pgTable('indexed_urls', {
  id: serial('id').primaryKey(),
  url: text('url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const chatsTable = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('user_id', { length: 256 }).notNull(),
  siteTitle: text('site_title').notNull(),
  siteUrl: text('site_url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const roleEnum = pgEnum('role_enum', ['assistant', 'user']);

export const messagesTable = pgTable('messages', {
  id: serial('id').primaryKey(),
  chatId: uuid('chat_id')
    .references(() => chatsTable.id)
    .notNull(),
  content: text('content').notNull(),
  role: roleEnum('role').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});
