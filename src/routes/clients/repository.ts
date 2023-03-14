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
    clients: any[];
  }>;
  create(user: CreateClientRequest): Promise<any>;
  findById({ id }: GetClientRequest): Promise<any | null>;
  findByCpf({ cpf }: CreateClientRequest): Promise<any | null>;
  update(
    { id }: UpdateClientRequestParams,
    client: UpdateClientRequestBody
  ): Promise<any>;
  delete({ id }: GetClientRequest): Promise<any>;
}
