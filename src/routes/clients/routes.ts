import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { database } from "../../database";
import { $ref, CreateClientRequest } from "./schema";

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
};
