import { Clients } from "knex/types/tables";
import {
  CreateClientRequest,
  GetClientRequest,
  GetClientsRequest,
  UpdateClientRequestBody,
  UpdateClientRequestParams,
} from "./schema";

export interface ClientRepository {
  getAll({ limit, page }: GetClientsRequest): Promise<{
    totalRows: string | number | undefined;
    page: number;
    totalPages: number;
    limit: number;
    clients: Clients[];
  }>;
  create(user: CreateClientRequest): Promise<Clients[]>;
  findById({ id }: GetClientRequest): Promise<Clients | null>;
  findByCpf({ cpf }: CreateClientRequest): Promise<Clients | null>;
  update(
    { id }: UpdateClientRequestParams,
    client: UpdateClientRequestBody
  ): Promise<number>;
  delete({ id }: GetClientRequest): Promise<number>;
}
