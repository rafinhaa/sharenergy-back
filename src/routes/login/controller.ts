import { FastifyReply, FastifyRequest } from "fastify";
import { database } from "../../database";
import argon2 from "argon2";
import { LoginUserRequest } from "./schema";

export const loginUserHandler = async (
  req: FastifyRequest<{
    Body: LoginUserRequest;
  }>,
  rep: FastifyReply
) => {
  const { password, username } = req.body;

  const user = await database("users").where("username", username).first();

  if (!user) return rep.code(401).send();

  const correctly = await argon2.verify(user.password, password, {
    salt: user.salt,
  });

  if (!correctly) return rep.code(401).send();

  return rep.code(200).send({ correctly });
};
