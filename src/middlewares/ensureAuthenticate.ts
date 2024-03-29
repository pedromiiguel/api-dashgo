import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Ipaylod {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ message: 'Token is missing' });
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(
      token,
      '7c18ae8f-6695-4add-87e6-89d6d2da059f'
    ) as Ipaylod;

    request.userId = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Token invalid' });
  }
}
