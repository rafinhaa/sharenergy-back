import { Knex } from "knex";
import { randomUUID } from "node:crypto";
import { ClientRepository } from "../repository";
import {
  CreateClientRequest,
  GetClientRequest,
  GetClientsRequest,
  UpdateClientRequestBody,
  UpdateClientRequestParams,
} from "../schema";

export class KnexClientRepository implements ClientRepository {
  constructor(private readonly knex: Knex) {}

  async getAll({ limit, page }: GetClientsRequest): Promise<{
    totalRows: string | number | undefined;
    page: number;
    totalPages: number;
    limit: number;
    clients: any[];
  }> {
    const [totalRows] = await this.knex("clients").count({ count: "*" });
    const hasLimit = limit > 0;

    const offset = (page - 1) * limit;
    const totalPages =
      totalRows.count && hasLimit
        ? Math.ceil(Number(totalRows.count.toString()) / limit)
        : 0;

    const allClients = hasLimit
      ? await this.knex("clients").select("*").limit(limit).offset(offset)
      : await this.knex("clients").select("*");

    return {
      totalRows: totalRows.count,
      page,
      totalPages,
      limit,
      clients: allClients,
    };
  }

  async create(client: CreateClientRequest): Promise<any> {
    return await this.knex("clients").insert(
      {
        id: randomUUID(),
        ...client,
      },
      ["*"]
    );
  }

  async findById({ id }: GetClientRequest): Promise<any | null> {
    const client = await this.knex("clients")
      .select("*")
      .where("id", id)
      .first();
    return client || null;
  }

  async findByCpf({ cpf }: CreateClientRequest): Promise<any | null> {
    const user = await this.knex("clients")
      .select("*")
      .where({ cpf })
      .whereNull("deleted_at")
      .first();

    return user || null;
  }

  async update(
    { id }: UpdateClientRequestParams,
    client: UpdateClientRequestBody
  ): Promise<any> {
    return this.knex("clients")
      .update({
        ...client,
        updated_at: this.knex.fn.now(),
      })
      .where("id", id)
      .whereNull("deleted_at");
  }

  async delete({ id }: GetClientRequest): Promise<any> {
    return await this.knex("clients")
      .update({
        deleted_at: this.knex.fn.now(),
      })
      .where("id", id)
      .whereNull("deleted_at");
  }
}