import fastify from "fastify";
import {
  clientsRoutes,
  dogsRoutes,
  httpCatRoutes,
  usersRoutes,
  loginRoutes,
} from "./routes";
import { userSchemas } from "./routes/clients/schema";
import { loginSchemas } from "./routes/login/schema";

const app = fastify();

for (const schema of [...userSchemas, ...loginSchemas]) {
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

app.register(usersRoutes, {
  prefix: "users",
});

app.register(loginRoutes, {
  prefix: "login",
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running!");
  });
