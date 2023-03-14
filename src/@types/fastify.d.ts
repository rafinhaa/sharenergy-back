import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { ClientRepository } from "../routes/clients/repository";

declare module "fastify" {
  interface FastifyInstance {
    clientRepository: ClientRepository;
  }
}
