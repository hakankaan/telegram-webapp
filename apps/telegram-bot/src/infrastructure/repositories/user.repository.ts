import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { UserRepository } from "../../application/interfaces";
import * as schema from '../db/schema'
import { randomUUID } from "crypto";


export class UserRepositoryImpl implements UserRepository {
  constructor(private db: NodePgDatabase<typeof schema>) {}  

  async saveUser(telegramId: string, firstName: string) {
    await this.db.insert(schema.users).values({
      id: randomUUID(),
      telegramId,
      firstName,
    });
  }

  async getUserByTelegramId(telegramId: string) {
    return this.db.query.users.findFirst({where: (users, {eq}) => eq(users.telegramId, telegramId)})
  }
}