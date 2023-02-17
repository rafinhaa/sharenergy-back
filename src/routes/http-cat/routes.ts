import { FastifyInstance } from "fastify";
import httpProxy from "@fastify/http-proxy";

const httpCatRoutes = async (app: FastifyInstance) => {
  app.register(httpProxy, {
    upstream: "https://http.cat/",
    http2: false,
  });
};

export default httpCatRoutes;
