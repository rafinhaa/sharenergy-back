import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const baseClient = {
  name: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().min(10).max(11),
  address: z.string().min(3).max(50),
  cpf: z.string().length(11),
};

const createClientRequest = z.object({
  ...baseClient,
});

const createClientResponse = z.object({
  client: z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
});

const getClientsResponse = z.object({
  clients: z.array(
    z.object({
      id: z.string().uuid(),
      ...baseClient,
      created_at: z.date(),
      updated_at: z.date(),
      deleted_at: z.date(),
    })
  ),
});

export type CreateClientRequest = z.input<typeof createClientRequest>;
export type CreateClientResponse = z.output<typeof createClientResponse>;
export type getClientResponse = z.output<typeof getClientsResponse>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createClientRequest,
  createClientResponse,
  getClientsResponse,
});
