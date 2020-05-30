import { Request, Response } from 'express';
import { container } from 'tsyringe';
import LoginUserService from '@modules/users/services/LoginUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const loginUser = container.resolve(LoginUserService);
    const { user, token } = await loginUser.execute({
      email,
      password,
    });
    delete user.password;
    return response.json({ user, token });
  }
}
