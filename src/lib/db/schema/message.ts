import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core';

import { chats } from './chat';

export const roleEnum = pgEnum('role_enum', ['assistant', 'user']);

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  chatId: uuid('chat_id')
    .references(() => chats.id)
    .notNull(),
  content: text('content').notNull(),
  role: roleEnum('role').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});
