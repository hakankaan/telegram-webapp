import { sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  telegramId: varchar('telegram_id').notNull().unique(),
  firstName: varchar('first_name').notNull(),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
})

