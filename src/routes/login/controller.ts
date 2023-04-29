import { FastifyReply, FastifyRequest } from "fastify";
import argon2 from "argon2";
import { LoginUserRequest } from "./schema";
import { randomBytes } from "node:crypto";

export const loginUserHandler = async (
  req: FastifyRequest<{
    Body: LoginUserRequest;
  }>,
  rep: FastifyReply
) => {
  const { password, username } = req.body;

  const user = await req.server.loginRepository.findUser({ username });

  if (!user) return rep.code(401).send();

  const correctly = await argon2.verify(user.password, password);

  if (!correctly) return rep.code(401).send();

  rep.setCookie("token", rep.signCookie("user-token"), {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
    signed: true,
    httpOnly: true,
  });

  return rep.code(200).send({ user });
};

export const createUserHandler = async (
  req: FastifyRequest<{
    Body: LoginUserRequest;
  }>,
  rep: FastifyReply
) => {
  const { username, password } = req.body;

  const userAlreadyExists = await req.server.loginRepository.findUser({
    username,
  });

  if (userAlreadyExists) return rep.code(409).send();

  const salt = randomBytes(16);

  const hash = await argon2.hash(password, {
    salt,
  });

  const newUser = await req.server.loginRepository.createUser({
    username,
    password: hash,
  });

  return rep.code(201).send({ user: newUser });
};
