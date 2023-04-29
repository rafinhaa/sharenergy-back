import { randomUUID } from "crypto";
import { Knex } from "knex";

const tableName = "users";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  // Inserts seed entries
  await knex(tableName).insert([
    {
      id: randomUUID(),
      username: "desafiosharenergy",
      password:
        "$argon2id$v=19$m=65536,t=3,p=4$yliNcrxZHGXycngwPfVMiQ$A1wbQVJj8B4tkKiw/YOQb1oDRwTDfcG0uveqJ071zFM",
    },
  ]);
}
