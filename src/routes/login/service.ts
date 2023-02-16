import { randomUUID } from "node:crypto";
import { database } from "../../database";
import { LoginUserRequest } from "./schema";

export const findUser = async ({
  username,
}: Omit<LoginUserRequest, "password">) => {
  return await database("users").where("username", username).first();
};

export const createUser = async (
  { username, password }: LoginUserRequest,
  salt: Buffer
) => {
  return await database("users").insert(
    {
      id: randomUUID(),
      username,
      salt: salt.toString("hex"),
      password,
    },
    ["*"]
  );
};
