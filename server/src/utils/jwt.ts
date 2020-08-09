import jwt from 'jsonwebtoken';

import jwtConfig from '../config/jwtConfig';

const generateTokenJWT = (payload: string | Buffer | object): string => {
  const token = jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });

  return token;
}

const verifyTokenJWT = (token: string) => {
  const decoded = jwt.verify(token, jwtConfig.secret);

  return decoded;
};


export {
  generateTokenJWT,
  verifyTokenJWT,
};
