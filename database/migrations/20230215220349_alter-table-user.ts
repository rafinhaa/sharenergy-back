import { Knex } from "knex";

const usersTable = "users";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(usersTable, (table) => {
    table.renameColumn("email", "username");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(usersTable, (table) => {
    table.renameColumn("username", "email");
  });
}
