import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, pool } from './db';

const main = async () => {

  await migrate(db, { migrationsFolder: './src/infrastructure/db/migrations' });

  await pool.end();
}

main().catch(console.error);