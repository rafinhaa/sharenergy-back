import fastifyPlugin from "fastify-plugin";

import { FastifyInstance } from "fastify";

export default fastifyPlugin(async (fastify: FastifyInstance) => {
  fastify.addHook("onRequest", (req, rep, done) => {
    const signedValue = req.cookies.token;
    if (!signedValue) rep.code(403).send();

    const unsignedValue = fastify.unsignCookie(signedValue!);
    if (!unsignedValue.valid) rep.code(403).send();

    done();
  });
});
