import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateClientRequest,
  DeleteClientRequest,
  GetClientRequest,
  GetClientsRequest,
  UpdateClientRequestBody,
  UpdateClientRequestParams,
} from "./schema";

export const createClientHandler = async (
  req: FastifyRequest<{
    Body: CreateClientRequest;
  }>,
  rep: FastifyReply
) => {
  const newClient = req.body;
  const userExists = await req.server.clientRepository.findByCpf(newClient);

  if (userExists) return rep.status(409).send();

  const [client] = await req.server.clientRepository.create(newClient);

  return rep.status(201).send({ client });
};

export const getClientsHandler = async (
  req: FastifyRequest<{
    Querystring: GetClientsRequest;
  }>,
  rep: FastifyReply
) => {
  const queryParams = req.query;
  const clients = await req.server.clientRepository.getAll(queryParams);

  return rep.status(200).send(clients);
};

export const getClientHandler = async (
  req: FastifyRequest<{
    Params: GetClientRequest;
  }>,
  rep: FastifyReply
) => {
  const id = req.params;
  const client = await rep.server.clientRepository.findById(id);

  return client ? rep.status(200).send({ client }) : rep.status(404).send();
};

export const deleteClientHandler = async (
  req: FastifyRequest<{
    Params: DeleteClientRequest;
  }>,
  rep: FastifyReply
) => {
  const id = req.params;

  const client = await req.server.clientRepository.delete(id);

  return client ? rep.status(200).send() : rep.status(404).send();
};

export const updateClientHandler = async (
  req: FastifyRequest<{
    Params: UpdateClientRequestParams;
    Body: UpdateClientRequestBody;
  }>,
  rep: FastifyReply
) => {
  const id = req.params;
  const newPropertiesClient = req.body;

  const client = await req.server.clientRepository.update(
    id,
    newPropertiesClient
  );

  return client ? rep.status(200).send() : rep.status(404).send();
};
