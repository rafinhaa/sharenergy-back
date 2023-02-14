import { Knex } from "knex";

const usersTable = "users";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(usersTable, (table) => {
    table.uuid("id").primary();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("salt").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at");
    table.timestamp("deleted_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(usersTable);
}
