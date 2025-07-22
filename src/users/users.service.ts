import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private userModel: Model<USER>) {}

  async findUsers(): Promise<USER[]> {
    const users= await this.userModel.find();
    return users;
  }

  async findUserById(id: string): Promise<USER>  {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`Not found user ${id}`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<USER> {
    const newUser= await this.userModel.create(createUserDto);
    return newUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<USER> {
    const updated_user= await this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true});    
    return updated_user;
  }

  async deleteUser(id: string): Promise<void> {
   await this.userModel.findByIdAndDelete(id);
  }
}
