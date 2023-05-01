import { randomBytes } from "node:crypto";
import { PasswordCryptRepository } from "../repository";
import argon2 from "argon2";

import { LoginUserRequest } from "../schema";

export class Argon2PasswordCryptRepository implements PasswordCryptRepository {
  async verify({
    hash,
    password,
  }: {
    hash: string;
    password: string;
  }): Promise<boolean> {
    return await argon2.verify(hash, password);
  }
  async hash({
    password,
  }: Omit<LoginUserRequest, "username">): Promise<string> {
    const salt = randomBytes(16);
    return await argon2.hash(password, {
      salt,
    });
  }
}
