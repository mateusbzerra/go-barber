import { Router } from 'express';

import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import uploadConfig from '@config/upload';
import AuthMiddleware from '../middlewares/auth';

const usersRouter = Router();
const upload = multer(uploadConfig);

// usersRouter.get('/', async (request, response) => {
//   const usersRepository = getRepository(User);
//   const users = await usersRepository.find();
//   return response.json(users);
// });

usersRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const { name, email, password } = request.body;

  const createUser = new CreateUserService(usersRepository);

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
    const usersRepository = new UsersRepository();
    const uploadAvatar = new UpdateUserAvatarService(usersRepository);
    const user = await uploadAvatar.execute({
      user_id: request.user.id,
      filename: request.file.filename,
    });
    delete user.password;
    return response.json(user);
  },
);

export default usersRouter;
