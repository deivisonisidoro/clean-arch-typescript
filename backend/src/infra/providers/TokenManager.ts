import dayjs from 'dayjs';
import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class TokenManagerProvider {
  static validateTokenAge(expires_in: number): boolean {
    return dayjs().isAfter(dayjs.unix(expires_in));
  }

  static validateToken(token: string): boolean {
    try {
      verify(token, process.env.API_SECRET || '');
      return true;
    } catch (error) {
      return false;
    }
  }
}
