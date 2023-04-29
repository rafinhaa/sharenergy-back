import { Knex } from "knex";
import { randomUUID } from "node:crypto";
import { LoginRepository } from "../repository";
import { LoginUserRequest } from "../schema";
import { User } from "knex/types/tables";

export class KnexLoginRepository implements LoginRepository {
  constructor(private readonly knex: Knex) {}
  async createUser({ username, password }: LoginUserRequest): Promise<User[]> {
    return await this.knex("users").insert(
      {
        id: randomUUID(),
        username,
        password,
      },
      ["*"]
    );
  }
  async findUser({ username }: { username: string; password: string }) {
    return await this.knex("users").where("username", username).first();
  }
}
