import { FastifyInstance } from "fastify";
import httpProxy from "@fastify/http-proxy";
import checkAuthCookie from "../../middleware/check-auth-cookie";

const dogsRoutes = async (app: FastifyInstance) => {
  app.register(checkAuthCookie);

  app.register(httpProxy, {
    upstream: "https://random.dog/woof.json",
    http2: false,
  });
};

export default dogsRoutes;
