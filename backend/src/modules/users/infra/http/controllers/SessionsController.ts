import { Request, Response } from 'express';
import { container } from 'tsyringe';
import LoginUserService from '@modules/users/services/LoginUserService';
import { classToClass } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const loginUser = container.resolve(LoginUserService);
    const { user, token } = await loginUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
