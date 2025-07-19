import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Not found user ${id}`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const new_User = this.userRepository.save(createUserDto);
    return new_User;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user_to_update = await this.userRepository.findOneBy({ id });
    if (!user_to_update)
      throw new NotFoundException(`No user found for this id ${id}`);

    const updated_user = { ...user_to_update, ...updateUserDto };
    await this.userRepository.save(updated_user);
    return updated_user;
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
