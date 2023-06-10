import { ConflictException, Injectable } from '@nestjs/common';
import { IUser, SerializedUser } from '../../types/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { User as UserEntity } from '../../../typeorm/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private users: IUser[] = [];

  getUsers(): IUser[] {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    const user = this.users.find((user) => user.username === username);
    return user;
  }
  getUserById(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
  async createUser(createUserDto: CreateUserDto) {
    const existedUser = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });
    if (existedUser) {
      throw new ConflictException('User with this username already exist');
    }
    const password = encodePassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto, password });
    return this.userRepository.save(newUser);
  }
  async findUserByUsername(username: string) {
    const user = await this.userRepository.findOneBy({
      username,
    });
    return user;
  }
  async findUserById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }
}
