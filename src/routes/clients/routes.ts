import { FastifyInstance } from "fastify";
import {
  createClientHandler,
  deleteClientHandler,
  getClientHandler,
  getClientsHandler,
  updateClientHandler,
} from "./controller";
import { $ref } from "./schema";

export const clientsRoutes = async (app: FastifyInstance) => {
  app.post(
    "/",
    {
      schema: {
        body: $ref("createClientRequest"),
        response: {
          201: $ref("createClientResponse"),
        },
      },
    },
    createClientHandler
  );

  app.get(
    "/",
    {
      schema: {
        querystring: $ref("getClientsRequest"),
        response: {
          200: $ref("getClientsResponse"),
        },
      },
    },
    getClientsHandler
  );

  app.get(
    "/:id",
    {
      schema: {
        params: $ref("getClientRequest"),
        response: {
          200: $ref("getClientResponse"),
        },
      },
    },
    getClientHandler
  );

  app.delete(
    "/:id",
    {
      schema: {
        params: $ref("deleteClientRequest"),
      },
    },
    deleteClientHandler
  );

  app.put(
    "/:id",
    {
      schema: {
        body: $ref("updateClientRequestBody"),
        params: $ref("updateClientRequestParams"),
      },
    },
    updateClientHandler
  );
};
