import { encryptPassword } from '../utils/bcrypt';

import UserRequestDTO from '../dtos/UserRequestDTO';
import UserResponseDTO from '../dtos/UserResponseDTO';
import db from '../database/connection';

class CreateUserService {

  public async execute({ name, surname, email, password }: UserRequestDTO): Promise<UserResponseDTO> {

    const userExists = await db('users')
      .where('users.email', '=', email)
      .select();
      
    if (userExists[0]) {
      throw new Error('User already exists.');
    }

    const passwordHash = await encryptPassword(password);

    const user_id = await db('users').insert({
      name,
      surname,
      email,
      password: passwordHash,
    });

    return {
      id: user_id[0],
      name,
      surname,
      email,
    };
  }
}

export default CreateUserService;
