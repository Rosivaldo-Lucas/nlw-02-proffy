import { Request, Response } from 'express';
import ConnectionService from '../services/ConnectionService';
import db from '../database/connection';

class ConnectionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const totalConnections = await db('connections').count('* as total');

    const { total } = totalConnections[0];

    return response.status(200).json(total);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.body;

    const connectionService = new ConnectionService();

    connectionService.create(user_id);

    return response.status(201).json({ ok: true });
  }
}

export default ConnectionController;
