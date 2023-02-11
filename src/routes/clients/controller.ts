import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import { database } from "../../database";
import {
  CreateClientRequest,
  DeleteClientRequest,
  GetClientRequest,
  UpdateClientRequestBody,
  UpdateClientRequestParams,
} from "./schema";

export const createClientHandler = async (
  req: FastifyRequest<{
    Body: CreateClientRequest;
  }>,
  rep: FastifyReply
) => {
  const { name, address, email, telephone, cpf } = req.body;
  const [client] = await database("clients").insert(
    {
      id: randomUUID(),
      name,
      address,
      email,
      telephone,
      cpf,
    },
    ["*"]
  );

  return rep.status(201).send({ client });
};

export const getClientsHandler = async (
  _: FastifyRequest,
  rep: FastifyReply
) => {
  const clients = await database("clients").select("*");

  return rep.status(200).send({ clients });
};

export const getClientHandler = async (
  req: FastifyRequest<{
    Params: GetClientRequest;
  }>,
  rep: FastifyReply
) => {
  const { id } = req.params;
  const client = await database("clients").select("*").where({ id }).first();

  return client ? rep.status(200).send({ client }) : rep.status(404).send();
};

export const deleteClientHandler = async (
  req: FastifyRequest<{
    Params: DeleteClientRequest;
  }>,
  rep: FastifyReply
) => {
  const { id } = req.params;

  const client = await database("clients")
    .update({
      deleted_at: database.fn.now(),
    })
    .where({ id })
    .whereNull("deleted_at");

  return client ? rep.status(200).send() : rep.status(404).send();
};

export const updateClientHandler = async (
  req: FastifyRequest<{
    Params: UpdateClientRequestParams;
    Body: UpdateClientRequestBody;
  }>,
  rep: FastifyReply
) => {
  const { id } = req.params;
  const newPropertiesClient = req.body;

  const client = await database("clients")
    .update({
      ...newPropertiesClient,
      updated_at: database.fn.now(),
    })
    .where({ id })
    .whereNull("deleted_at");

  return client ? rep.status(200).send() : rep.status(404).send();
};
