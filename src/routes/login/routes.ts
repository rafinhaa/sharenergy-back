import { FastifyInstance } from "fastify";
import { createUserHandler, loginUserHandler } from "./controller";
import { $ref } from "./schema";

const loginRoutes = async (app: FastifyInstance) => {
  app.post(
    "/",
    {
      schema: {
        body: $ref("loginUserRequest"),
      },
    },
    loginUserHandler
  );

  app.post("/create", createUserHandler);
};

export default loginRoutes;
