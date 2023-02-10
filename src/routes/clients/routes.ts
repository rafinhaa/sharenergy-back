import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { database } from "../../database";
import {
  $ref,
  CreateClientRequest,
  DeleteClientRequest,
  GetClientRequest,
  UpdateClientRequestBody,
  UpdateClientRequestParams,
} from "./schema";

export const clientsRoutes = async (app: FastifyInstance) => {
  app.post<{
    Body: CreateClientRequest;
  }>(
    "/",
    {
      schema: {
        body: $ref("createClientRequest"),
        response: {
          201: $ref("createClientResponse"),
        },
      },
    },
    async (req, rep) => {
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
    }
  );

  app.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("getClientsResponse"),
        },
      },
    },
    async (_, rep) => {
      const clients = await database("clients").select("*");

      return rep.status(200).send({ clients });
    }
  );

  app.get<{
    Params: GetClientRequest;
  }>(
    "/:id",
    {
      schema: {
        params: $ref("getClientRequest"),
        response: {
          200: $ref("getClientResponse"),
        },
      },
    },
    async (req, rep) => {
      const { id } = req.params;
      const client = await database("clients")
        .select("*")
        .where({ id })
        .first();

      return client ? rep.status(200).send({ client }) : rep.status(404).send();
    }
  );

  app.delete<{
    Params: DeleteClientRequest;
  }>(
    "/:id",
    {
      schema: {
        params: $ref("deleteClientRequest"),
      },
    },
    async (req, rep) => {
      const { id } = req.params;

      const client = await database("clients")
        .update({
          deleted_at: database.fn.now(),
        })
        .where({ id })
        .whereNull("deleted_at");

      return client ? rep.status(200).send() : rep.status(404).send();
    }
  );

  app.put<{
    Params: UpdateClientRequestParams;
    Body: UpdateClientRequestBody;
  }>(
    "/:id",
    {
      schema: {
        body: $ref("updateClientRequestBody"),
        params: $ref("updateClientRequestParams"),
      },
    },
    async (req, rep) => {
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
    }
  );
};
