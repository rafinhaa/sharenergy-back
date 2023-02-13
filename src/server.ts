import fastify from "fastify";
import { clientsRoutes, dogsRoutes, httpCatRoutes } from "./routes";
import { userSchemas } from "./routes/clients/schema";

const app = fastify();

for (const schema of [...userSchemas]) {
  app.addSchema(schema);
}

app.register(clientsRoutes, {
  prefix: "clients",
});

app.register(dogsRoutes, {
  prefix: "dogs",
});

app.register(httpCatRoutes, {
  prefix: "catcode",
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running!");
  });
