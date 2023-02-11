import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Clients {
    id: string;
    name: string;
    email: string;
    telephone: string;
    address: string;
    cpf: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  }

  export interface Tables {
    clients: Clients;
    users_composite: Knex.CompositeTableType<
      Clients,
      Pick<Clients, "name"> &
        Partial<Pick<Clients, "created_at" | "updated_at">>,
      Partial<Omit<Clients, "id">>
    >;
  }
}
