import { config } from 'dotenv';
config();

import { IGenerateRefreshTokenProvider } from "../../app/providers/GenerateRefreshToken";
import { sign } from "jsonwebtoken";

export class GenerateRefreshTokenProvider implements IGenerateRefreshTokenProvider {
  async generateToken(token: string): Promise<string> {
    const secretKey = process.env.API_SECRET;

    if (!secretKey) {
      throw new Error('API_SECRET is missing in the environment variables.');
    }

    const generatedToken = sign({}, secretKey, {
      subject: token,
      expiresIn: "10h"
    });
    return generatedToken;
  }
}
