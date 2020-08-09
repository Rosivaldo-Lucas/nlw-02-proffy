import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import db from '../database/connection';
import authConfig from '../config/jwtConfig';
import CreateSessionService from '../services/CreateSessionService';

class SessionController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionService = new CreateSessionService();

    const { user, token } = await createSessionService.execute({ email, password });

    return response.json({
      user,
      token,
    });
  }
}

export default SessionController;
