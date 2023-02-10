import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createClientRequest = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().min(10).max(11),
  address: z.string().min(3).max(50),
  cpf: z.string().length(11),
});

const createClientResponse = z.object({
  client: z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
});

export type CreateClientRequest = z.input<typeof createClientRequest>;
export type CreateClientResponse = z.output<typeof createClientResponse>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createClientRequest,
  createClientResponse,
});
