import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const baseClient = {
  name: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().min(10).max(11),
  address: z.string().min(3).max(50),
  cpf: z.string().length(11),
};

const baseClientRequest = {
  id: z.string().uuid(),
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

const getClientsRequest = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(0).default(0),
});

const getClientsResponse = z.object({
  page: z.number().int(),
  limit: z.number().int(),
  totalRows: z.number().int(),
  totalPages: z.number().int(),
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

const getClientRequest = z.object({
  ...baseClientRequest,
});

const getClientResponse = z.object({
  client: z.object({
    id: z.string().uuid(),
    ...baseClient,
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date(),
  }),
});

const deleteClientRequest = z.object({
  ...baseClientRequest,
});

const updateClientRequestParams = z.object({
  ...baseClientRequest,
});

const updateClientRequestBody = z.object({
  ...baseClient,
});

export type CreateClientRequest = z.input<typeof createClientRequest>;
export type CreateClientResponse = z.output<typeof createClientResponse>;
export type GetClientsRequest = z.output<typeof getClientsRequest>;
export type GetClientsResponse = z.output<typeof getClientsResponse>;
export type GetClientRequest = z.input<typeof getClientRequest>;
export type GetClientResponse = z.output<typeof getClientResponse>;
export type DeleteClientRequest = z.input<typeof deleteClientRequest>;
export type UpdateClientRequestParams = z.output<
  typeof updateClientRequestParams
>;
export type UpdateClientRequestBody = z.output<typeof updateClientRequestBody>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createClientRequest,
  createClientResponse,
  getClientsRequest,
  getClientsResponse,
  getClientResponse,
  getClientRequest,
  deleteClientRequest,
  updateClientRequestParams,
  updateClientRequestBody,
});
