import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UseFilters,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { SerializedUser } from '../../types/User';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  getUsers() {
    const users = this.usersService.getUsers();
    return users;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('username/:username')
  getUserByUsername(@Param('username') username: string) {
    const user = this.usersService.getUserByUsername(username);
    if (user) return new SerializedUser(user);
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('id/:id')
  @UseFilters(HttpExceptionFilter)
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.getUserById(id);
    if (user) return new SerializedUser(user);
    else throw new UserNotFoundException();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createuser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
}
