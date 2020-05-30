import { Router } from 'express';
import { container } from 'tsyringe';
import LoginUserService from '@modules/users/services/LoginUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const loginUser = container.resolve(LoginUserService);
  const { user, token } = await loginUser.execute({
    email,
    password,
  });
  delete user.password;
  return response.json({ user, token });
});
export default sessionsRouter;
