import { Knex } from "knex";

const usersTable = "users";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(usersTable, (table) => {
    table.dropColumn("salt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(usersTable, (table) => {
    table.string("salt").notNullable();
  });
}
