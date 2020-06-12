import { Router } from 'express';

import Auth from '@modules/users/infra/http/middlewares/auth';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(Auth);

providersRouter.get('/', providersController.index);

export default providersRouter;
