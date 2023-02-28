import fastify from "fastify";
import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { env } from "./env";
import cookie, { FastifyCookieOptions } from "@fastify/cookie";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = fastify();

app.register(autoLoad, {
  dir: join(__dirname, "plugins"),
});

app.register(cookie, {
  secret: env.COOKIE_SECRET,
} as FastifyCookieOptions);

app.register(autoLoad, {
  dir: join(__dirname, "routes"),
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP server running!");
  });
