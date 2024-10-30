import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserBody } from './dtos/create-user-body';
import { GetUserParams } from './dtos/get-user-params';
import { UpdateUserBody } from './dtos/update-user-body';
import { UpdateUserParams } from './dtos/update-user-params';
import { DeleteUserParams } from './dtos/delete-user-params';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getUsers() {
    const users = await this.userService.users();

    return { users };
  }

  @Get(':email')
  async getUser(@Param() params: GetUserParams) {
    const user = await this.userService.user(params);

    if (!user) return { user: null };

    return user;
  }

  @Post('create')
  async createUser(@Body() body: CreateUserBody) {
    const user = await this.userService.createUser(body);

    if (!user) {
      throw new BadRequestException('User already exists');
    }

    return { user };
  }

  @Put(':email')
  async updateUser(
    @Param() params: UpdateUserParams,
    @Body() body: UpdateUserBody,
  ) {
    const user = await this.userService.updateUser({
      data: body,
      where: { email: params.email },
    });

    return { user };
  }

  @Delete(':email')
  async deleteUser(@Param() params: DeleteUserParams) {
    await this.userService.deleteUser(params);
  }
}
