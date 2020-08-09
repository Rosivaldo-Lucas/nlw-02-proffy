import { Request, Response, NextFunction } from 'express';

import { verifyTokenJWT } from '../utils/jwt';

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

const authMiddleware = (request: Request, response: Response, next: NextFunction) => {

  const headerAuthorization = request.headers.authorization;

  if (!headerAuthorization || headerAuthorization === 'Bearer undefined') {
    return response.status(401).json({
      error: 'Token not provided',
    });
  }

  const token = headerAuthorization.split(' ')[1];

  try {
    const decoded = verifyTokenJWT(token);

    const { id } = decoded as TokenPayload;

    request.user = {
      id: id,
    };

    return next();
  } catch (err) {
    return response.status(401).json({
      error: 'Token invalid',
    });
  }
};

export default authMiddleware;
