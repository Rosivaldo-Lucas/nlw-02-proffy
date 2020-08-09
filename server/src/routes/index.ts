import { Router } from 'express';

import authMiddleware from '../middlewares/auth';

import ClassController from '../controllers/ClassController';
import ConnectionController from '../controllers/ConnectionController';
import SessionController from '../controllers/SessionController';
import UserController from '../controllers/UserController';

const routes = Router();
const classController = new ClassController();
const connectionController = new ConnectionController();
const sessionController = new SessionController();
const userController = new UserController();

routes.post('/users', userController.create);

routes.use(authMiddleware);

routes.get('/classes', classController.index);
routes.post('/classes', classController.create);

routes.get('/connections', connectionController.index);
routes.post('/connections', connectionController.create);

routes.post('/sessions', sessionController.create);

routes.get('/users', userController.index);

export default routes;
