import { randomUUID } from "node:crypto";
import { database } from "../../database";
import {
  CreateClientRequest,
  GetClientRequest,
  GetClientsRequest,
  UpdateClientRequestBody,
  UpdateClientRequestParams,
} from "./schema";

export const userAlreadyExists = async ({ cpf }: CreateClientRequest) => {
  return await database("clients")
    .select("*")
    .where("cpf", cpf)
    .whereNull("deleted_at")
    .first();
};

export const createClient = async (client: CreateClientRequest) => {
  return await database("clients").insert(
    {
      id: randomUUID(),
      ...client,
    },
    ["*"]
  );
};

export const getClients = async ({ limit, page }: GetClientsRequest) => {
  const [totalRows] = await database("clients").count({ count: "*" });
  const hasLimit = limit > 0;

  const offset = (page - 1) * limit;
  const totalPages =
    totalRows.count && hasLimit
      ? Math.ceil(Number(totalRows.count.toString()) / limit)
      : 0;

  const allClients = hasLimit
    ? await database("clients").select("*").limit(limit).offset(offset)
    : await database("clients").select("*");

  return {
    totalRows: totalRows.count,
    page,
    totalPages,
    limit,
    clients: allClients,
  };
};

export const getClient = async ({ id }: GetClientRequest) => {
  return await database("clients").select("*").where("id", id).first();
};

export const deleteClient = async ({ id }: GetClientRequest) => {
  return await database("clients")
    .update({
      deleted_at: database.fn.now(),
    })
    .where("id", id)
    .whereNull("deleted_at");
};

export const updateClient = async (
  { id }: UpdateClientRequestParams,
  client: UpdateClientRequestBody
) => {
  return await database("clients")
    .update({
      ...client,
      updated_at: database.fn.now(),
    })
    .where("id", id)
    .whereNull("deleted_at");
};
