import { FastifyInstance } from "fastify";
import httpProxy from "@fastify/http-proxy";

export const httpCatRoutes = async (app: FastifyInstance) => {
  app.register(httpProxy, {
    upstream: "https://http.cat/",
    http2: false,
  });
};
