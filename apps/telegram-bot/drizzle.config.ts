import { defineConfig } from 'drizzle-kit';

console.log("DATABASE_URL", process.env.DATABASE_URL);

export default defineConfig({
  schema: './src/infrastructure/db/schema.ts',
  out: './src/infrastructure/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});