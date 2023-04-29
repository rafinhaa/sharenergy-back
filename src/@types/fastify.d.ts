import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { ClientRepository } from "../routes/clients/repository";
import { LoginRepository } from "../routes/login/repository";

declare module "fastify" {
  interface FastifyInstance {
    clientRepository: ClientRepository;
    loginRepository: LoginRepository;
  }
}
