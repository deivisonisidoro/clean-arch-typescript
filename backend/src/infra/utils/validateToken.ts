import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function validateToken(token: string): boolean {
  try {
    verify(token, process.env.API_SECRET || '');
    return true;
  } catch (error) {
    return false;
  }
}
