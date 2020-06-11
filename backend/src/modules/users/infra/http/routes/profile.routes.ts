import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import AuthMiddleware from '../middlewares/auth';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(AuthMiddleware);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
