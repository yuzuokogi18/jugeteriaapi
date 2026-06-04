import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { UserPublic } from '../entities/User';

const SALT_ROUNDS = 12;

export const hashPassword = async (
  plain: string
): Promise<string> =>
  bcrypt.hash(plain, SALT_ROUNDS);

export const comparePassword = async (
  plain: string,
  hash: string
): Promise<boolean> =>
  bcrypt.compare(plain, hash);

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export const signToken = (
  user: UserPublic
): string => {

  const secret =
    process.env.JWT_SECRET as string;

  const expiresIn =
    (process.env.JWT_EXPIRES_IN ||
    '7d') as any;

  const payload: JwtPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(
    payload,
    secret,
    {
      expiresIn,
    }
  );
};

export const verifyToken = (
  token: string
): JwtPayload => {

  const secret =
    process.env.JWT_SECRET as string;

  return jwt.verify(
    token,
    secret
  ) as JwtPayload;
};