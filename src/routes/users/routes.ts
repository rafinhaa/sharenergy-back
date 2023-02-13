import { FastifyInstance } from "fastify";
import httpProxy from "@fastify/http-proxy";

export const usersRoutes = async (app: FastifyInstance) => {
  app.register(httpProxy, {
    upstream: "https://randomuser.me/api",
    http2: false,
  });
};
