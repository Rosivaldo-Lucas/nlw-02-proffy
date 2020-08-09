import db from "../database/connection";

import { checkPassword } from '../utils/bcrypt';
import { generateTokenJWT } from '../utils/jwt';

interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

class CreateSessionService {

  public async execute({email, password }: IRequest): Promise<IResponse> {
    const users = await db('users')
    .where('users.email', '=', email)
    .select();

    const user: IUser = users[0];

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const passwordMatch = await checkPassword(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid email or password.');
    }

    const token = generateTokenJWT({ id: user.id });

    delete user.password;

    return {
      user,
      token,
    }
  }
}

export default CreateSessionService;
