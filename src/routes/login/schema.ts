import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const loginUserRequest = z.object({
  username: z.string().min(8),
  password: z.string().min(6),
});

const loginUserResponse = z.object({
  user: z.object({
    id: z.string().uuid(),
    username: z.string().min(8),
  }),
});

export type LoginUserRequest = z.input<typeof loginUserRequest>;
export type LoginUserResponse = z.input<typeof loginUserResponse>;

export const { schemas, $ref } = buildJsonSchemas(
  {
    loginUserRequest,
    loginUserResponse,
  },
  {
    $id: "loginSchemas",
  }
);
