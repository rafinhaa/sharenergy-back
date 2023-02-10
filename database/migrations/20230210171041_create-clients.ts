import { Knex } from "knex";

const clientsTable = "clients";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(clientsTable, (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("telephone").notNullable();
    table.string("address").notNullable();
    table.string("cpf").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at");
    table.timestamp("deleted_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(clientsTable);
}
