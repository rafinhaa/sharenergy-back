import fastify from "fastify";
import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = fastify();

app.register(autoLoad, {
  dir: join(__dirname, "plugins"),
});

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
