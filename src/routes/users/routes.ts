import { FastifyInstance } from "fastify";
import httpProxy from "@fastify/http-proxy";
import checkAuthCookie from "../../middleware/check-auth-cookie";

const usersRoutes = async (app: FastifyInstance) => {
  app.register(checkAuthCookie);

  app.register(httpProxy, {
    upstream: "https://randomuser.me/api",
    http2: false,
  });
};

export default usersRoutes;
