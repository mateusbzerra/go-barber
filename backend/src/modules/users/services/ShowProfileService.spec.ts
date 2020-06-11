import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('-> UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    const getUser = await showProfile.execute({ user_id: user.id });
    expect(getUser.name).toBe('John Doe');
    expect(getUser.email).toBe('johndoe@example.com');
  });

  it('should not be able to show the profile form non-existing user', async () => {
    await expect(
      showProfile.execute({ user_id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
