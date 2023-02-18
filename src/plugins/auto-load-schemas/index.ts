import fastifyPlugin from "fastify-plugin";
import glob from "fast-glob";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Schema } from "ajv";
import { FastifyInstance } from "fastify";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadSchemasFromFiles = async () => {
  const schemaFiles = await glob(`${__dirname}/../../routes/**/schema.ts`);

  const schemas: Schema[] = await Promise.all(
    schemaFiles.map(async (schemaPath) => {
      const { schemas } = await import(`${schemaPath}`);
      return schemas;
    })
  );

  return schemas.flat();
};

const addSchemasToFastify = (schemas: Schema[], fastify: FastifyInstance) => {
  if (schemas.length) schemas.map((schema) => fastify.addSchema(schema));
};

export default fastifyPlugin(async (fastify: FastifyInstance) => {
  const allSchemas = await loadSchemasFromFiles();
  addSchemasToFastify(allSchemas, fastify);
});
