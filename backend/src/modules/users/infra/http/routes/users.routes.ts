import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import uploadConfig from '@config/upload';
import AuthMiddleware from '../middlewares/auth';

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
