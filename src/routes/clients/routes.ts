import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { database } from "../../database";

export const clientsRoutes = async (app: FastifyInstance) => {
  app.post("/", async (req, rep) => {
    const { name, address, email, telephone, cpf } = req.body;
    const client = await database("clients").insert(
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
  });
};
