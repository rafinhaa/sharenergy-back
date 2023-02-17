import { FastifyInstance } from "fastify";
import httpProxy from "@fastify/http-proxy";

const dogsRoutes = async (app: FastifyInstance) => {
  app.register(httpProxy, {
    upstream: "https://random.dog/woof.json",
    http2: false,
  });
};

export default dogsRoutes;
