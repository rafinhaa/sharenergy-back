import fastify from "fastify";
import { clientsRoutes } from "./routes";

const app = fastify();

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
