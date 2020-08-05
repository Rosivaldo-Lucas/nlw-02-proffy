import { Request, Response } from 'express';

import CreateClassService from '../services/CreateClassService';
import ListClassService from '../services/ListClassService';

class ClassController {
  public async index(request: Request, response: Response): Promise<Response> {
    const filters = request.query;

    const listClassService = new ListClassService();

    try {
      const classes = await listClassService.execute(filters);

      return response.status(200).json(classes);
    } catch (err) {
      return response.status(401).json({
        error: err.message,
      });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createClassService = new CreateClassService();
    
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;
    
    try {
      await createClassService.execute({
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule,
      });
  
      return response.status(201).json({ ok: true });
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      })
    }
  }
}

export default ClassController;
