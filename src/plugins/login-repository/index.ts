import fastifyPlugin from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { database } from "../../database";

import { KnexLoginRepository } from "../../routes/login/services/knex-service";
import { Argon2PasswordCryptRepository } from "../../routes/login/services/argon2-service";

export default fastifyPlugin(async (fastify: FastifyInstance) => {
  const loginRepository = new KnexLoginRepository(database);
  const passwordCryptRepository = new Argon2PasswordCryptRepository();

  fastify.decorate("loginRepository", loginRepository);
  fastify.decorate("passwordRepository", passwordCryptRepository);
});
