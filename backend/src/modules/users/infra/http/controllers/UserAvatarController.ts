import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const uploadAvatar = container.resolve(UpdateUserAvatarService);
    const user = await uploadAvatar.execute({
      user_id: request.user.id,
      filename: request.file.filename,
    });
    delete user.password;
    return response.json(classToClass(user));
  }
}
