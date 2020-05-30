import { Router } from 'express';
import LoginUserService from '@modules/users/services/LoginUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const { email, password } = request.body;
  const loginUser = new LoginUserService(usersRepository);
  const { user, token } = await loginUser.execute({
    email,
    password,
  });
  delete user.password;
  return response.json({ user, token });
});
export default sessionsRouter;
