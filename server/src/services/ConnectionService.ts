import db from '../database/connection';

class ConnectionService {
  public async create(user_id: number): Promise<void> {
    await db('connections').insert({
      user_id,
    });
  }
}

export default ConnectionService;
