import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import db from '../database/connection';

class UserController {

  public async index(request: Request, response: Response): Promise<Response> {

    const users = await db('users').select('*');

    const usersResponse = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        avatar: user.avatar,
        whatsapp: user.whatsapp,
        bio: user.bio,
      };
    });

    return response.json(usersResponse);

  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, surname, email, password } = request.body;

    const createUserService = new CreateUserService();

    try {
      const user = await createUserService.execute({
        name,
        surname,
        email,
        password,
      });
  
      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      });
    }
  }

}

export default UserController;
