import { knex, Knex } from "knex";

export const config: Knex.Config = {
  client: "sqlite",
  connection: {
    filename: "./database/app.db",
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./database/migrations",
  },
  seeds: {
    extension: "ts",
    directory: "./database/seeds",
  },
};

export const database = knex(config);
