import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';

import UsersController from '../controllers/UsersController';
import AuthMiddleware from '../middlewares/auth';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  AuthMiddleware,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
