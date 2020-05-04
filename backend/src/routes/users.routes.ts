import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import User from '../models/User';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import AuthMiddleware from '../middlewares/auth';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();
  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });
  delete user.password;
  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  AuthMiddleware,
  upload.single('avatar'),
  async (request, response) => {
    const uploadAvatar = new UpdateUserAvatarService();
    const user = await uploadAvatar.execute({
      user_id: request.user.id,
      filename: request.file.filename,
    });
    delete user.password;
    return response.json(user);
  },
);

export default usersRouter;
