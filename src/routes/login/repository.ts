import { User } from "knex/types/tables";
import { LoginUserRequest } from "./schema";

export interface LoginRepository {
  createUser({ username, password }: LoginUserRequest): Promise<User[]>;
  findUser({
    username,
  }: Omit<LoginUserRequest, "password">): Promise<User | undefined>;
}

export interface PasswordCryptRepository {
  verify({
    hash,
    password,
  }: {
    hash: string;
    password: string;
  }): Promise<boolean>;
  hash({ password }: Omit<LoginUserRequest, "username">): Promise<string>;
}
