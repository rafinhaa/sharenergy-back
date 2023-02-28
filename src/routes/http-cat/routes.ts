import { FastifyInstance } from "fastify";
import httpProxy from "@fastify/http-proxy";
import checkAuthCookie from "../../middleware/check-auth-cookie";

const httpCatRoutes = async (app: FastifyInstance) => {
  app.register(checkAuthCookie);

  app.register(httpProxy, {
    upstream: "https://http.cat/",
    http2: false,
  });
};

export default httpCatRoutes;
