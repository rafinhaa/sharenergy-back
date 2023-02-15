import { FastifyInstance } from "fastify";
import { loginUserHandler } from "./controller";
import { $ref } from "./schema";

export const loginRoutes = async (app: FastifyInstance) => {
  app.post(
    "/",
    {
      schema: {
        body: $ref("loginUserRequest"),
      },
    },
    loginUserHandler
  );
};
