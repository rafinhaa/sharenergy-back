import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const loginUserRequest = z.object({
  username: z.string().min(8),
  password: z.string().min(6),
});

export type LoginUserRequest = z.input<typeof loginUserRequest>;

export const { schemas, $ref } = buildJsonSchemas(
  {
    loginUserRequest,
  },
  {
    $id: "loginSchemas",
  }
);
