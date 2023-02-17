import fastify from "fastify";
import { userSchemas } from "./routes/clients/schema";
import { loginSchemas } from "./routes/login/schema";
import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = fastify();

for (const schema of [...userSchemas, ...loginSchemas]) {
  app.addSchema(schema);
}

app.register(autoLoad, {
  dir: join(__dirname, "routes"),
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running!");
  });
