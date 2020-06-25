import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';
import UserAvatarController from '../controllers/UserAvatarController';

import UsersController from '../controllers/UsersController';
import AuthMiddleware from '../middlewares/auth';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',

  AuthMiddleware,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
