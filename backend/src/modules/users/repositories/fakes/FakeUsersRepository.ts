import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import User from '../../infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: User[] = [];

  public async findAllProviders(except_user_id?: string): Promise<User[]> {
    let users = this.ormRepository;
    if (except_user_id) {
      users = this.ormRepository.filter(user => user.id !== except_user_id);
    }
    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.ormRepository.find(user => user.id === id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.ormRepository.find(user => user.email === email);
    return findUser;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });

    this.ormRepository.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.ormRepository.findIndex(
      findUser => findUser.id === user.id,
    );
    this.ormRepository[findIndex] = user;
    return user;
  }
}
export default UsersRepository;
