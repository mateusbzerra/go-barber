import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import LoginUserService from './LoginUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let loginUserService: LoginUserService;
describe('LoginUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    loginUserService = new LoginUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  test('It should be able to login user', async () => {
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
    await expect(
      loginUserService.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  test('It should not be able to login with an incorrect email/password', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      loginUserService.execute({
        email: 'wrong-email@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      loginUserService.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
