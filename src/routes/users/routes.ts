import { FastifyInstance } from "fastify";
import httpProxy from "@fastify/http-proxy";

const usersRoutes = async (app: FastifyInstance) => {
  app.register(httpProxy, {
    upstream: "https://randomuser.me/api",
    http2: false,
  });
};

export default usersRoutes;
