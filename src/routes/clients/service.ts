import { randomUUID } from "crypto";
import { database } from "../../database";
import {
  CreateClientRequest,
  GetClientRequest,
  UpdateClientRequestBody,
  UpdateClientRequestParams,
} from "./schema";

export const createClient = async (client: CreateClientRequest) => {
  return await database("clients").insert(
    {
      id: randomUUID(),
      ...client,
    },
    ["*"]
  );
};

export const getClients = async () => {
  return await database("clients").select("*");
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
