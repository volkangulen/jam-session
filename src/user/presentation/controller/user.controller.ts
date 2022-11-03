import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserLoginCommand } from 'src/user/application/command/user-login/user.login.command';
import { UserRegisterCommand } from 'src/user/application/command/user-register/user.register.command';
import { User } from 'src/user/domain/entity/user.entity';
import { UserLoginRequest, UserRegisterRequest } from 'src/user/presentation/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  async login(@Body() userLoginRequest: UserLoginRequest): Promise<User> {
    return this.commandBus.execute<UserLoginCommand, User>(new UserLoginCommand(userLoginRequest));
  }
  @Post('register')
  async register(@Body() userRegisterRequest: UserRegisterRequest): Promise<User> {
    return this.commandBus.execute<UserRegisterCommand, User>(
      new UserRegisterCommand(userRegisterRequest),
    );
  }
}
