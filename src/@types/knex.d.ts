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
    updated_at: string | null;
    deleted_at: string | null;
  }

  export interface User {
    id: string;
    username: string;
    password: string;
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
  }

  export interface Tables {
    clients: Clients;
    users: User;
  }
}
