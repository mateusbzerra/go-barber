import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import LoginUserService from './LoginUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('LoginUser', () => {
  test('It should be able to login user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const loginUserService = new LoginUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const loginResponse = await loginUserService.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(loginResponse).toHaveProperty('token');
    expect(loginResponse.user).toEqual(user);
  });

  test('It should not be able to login with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const loginUserService = new LoginUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    expect(
      loginUserService.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  test('It should not be able to login with an incorrect email/password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const loginUserService = new LoginUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      loginUserService.execute({
        email: 'wrong-email@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(
      loginUserService.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
