import fastifyPlugin from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { database } from "../../database";

import { KnexClientRepository } from "../../routes/clients/services/knex-service";

export default fastifyPlugin(async (fastify: FastifyInstance) => {
  const clientRepository = new KnexClientRepository(database);

  fastify.decorate("clientRepository", clientRepository);
});
