import { FastifyReply, FastifyRequest } from "fastify";
import argon2 from "argon2";
import { LoginUserRequest } from "./schema";
import { createUser, findUser } from "./service";
import { randomBytes } from "node:crypto";

export const loginUserHandler = async (
  req: FastifyRequest<{
    Body: LoginUserRequest;
  }>,
  rep: FastifyReply
) => {
  const { password, username } = req.body;

  const user = await findUser({ username });

  if (!user) return rep.code(401).send();

  const correctly = await argon2.verify(user.password, password, {
    salt: user.salt,
  });

  if (!correctly) return rep.code(401).send();

  return rep.code(200).send({ correctly });
};

export const createUserHandler = async (
  req: FastifyRequest<{
    Body: LoginUserRequest;
  }>,
  rep: FastifyReply
) => {
  const { username, password } = req.body;

  const userAlreadyExists = await findUser({ username });

  if (userAlreadyExists) return rep.code(409).send();

  const salt = randomBytes(16);

  const hash = await argon2.hash(password, {
    salt,
  });

  const newUser = await createUser({ username, password: hash }, salt);

  return rep.code(201).send({ user: newUser });
};
