import fastifyPlugin from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { database } from "../../database";

import { KnexLoginRepository } from "../../routes/login/services/knex-service";

export default fastifyPlugin(async (fastify: FastifyInstance) => {
  const loginRepository = new KnexLoginRepository(database);

  fastify.decorate("loginRepository", loginRepository);
});
