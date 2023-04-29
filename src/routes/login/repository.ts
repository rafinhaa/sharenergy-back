import { User } from "knex/types/tables";
import { LoginUserRequest } from "./schema";

export interface LoginRepository {
  createUser({ username, password }: LoginUserRequest): Promise<User[]>;
  findUser({
    username,
  }: Omit<LoginUserRequest, "password">): Promise<User | undefined>;
}
