// lib/auth.ts
import { cookies } from 'next/headers';
import { UserPayload, generateToken, verifyToken } from './jwt';

const TOKEN_NAME = 'auth-token';

export async function setAuthToken(userPayload: UserPayload) {
  const token = generateToken(userPayload);
  const cookieStore = await cookies();
  
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  
  if (!token) return null;
  
  return verifyToken(token);
}

export async function clearAuthToken() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
}