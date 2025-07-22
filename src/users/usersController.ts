import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './users.service';
import { USER } from 'src/schemas/user.schema';
import { MongoIdDto } from './dtos/user-id.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async find(): Promise<USER[]> {
    return this.userService.findUsers();
  }

@Get(':id')
async findOne(
  @Param() params: MongoIdDto,
): Promise<USER> {
  return this.userService.findUserById(params.id);
}

  @Post()
  async create(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<USER> {
    return await this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  async update(
    @Param() parmas: MongoIdDto,
    @Body()
    updateUserDto: UpdateUserDto,
  ): Promise<USER> {
    return this.userService.updateUser(parmas.id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: MongoIdDto): Promise<void> {
    await this.userService.deleteUser(params.id);
  }
}
