import { knex, Knex } from "knex";
import { env } from "../env";

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: {
    filename: env.DATABASE_URL,
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
