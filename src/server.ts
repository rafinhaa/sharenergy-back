import fastify from "fastify";
import { clientsRoutes } from "./routes";
import { userSchemas } from "./routes/clients/schema";

const app = fastify();

for (const schema of [...userSchemas]) {
  app.addSchema(schema);
}

app.register(clientsRoutes, {
  prefix: "clients",
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running!");
  });
