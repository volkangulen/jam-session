import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserLoginCommand } from './user.login.command';
import { ForbiddenException } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { Password } from '@common/vo/password';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/user/presentation/dto/token.dto';

@CommandHandler(UserLoginCommand)
export class UserLoginHandler implements ICommandHandler<UserLoginCommand> {
  constructor(
    // private readonly eventPublisher: EventPublisher,
    private readonly _repository: UserRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async execute({ userLoginRequest }: UserLoginCommand): Promise<Token> {
    const user = await this._repository.findOne(userLoginRequest.email);
    if (!user) {
      throw new ForbiddenException(`User with email ${userLoginRequest.email} does not exist!`);
    }
    if (!(await user.validatePassword(await Password.create(userLoginRequest.password, true)))) {
      throw new ForbiddenException(`Wrong password.`);
    }
    return {
      accessToken: this._jwtService.sign({
        payload: {
          email: user.email.value,
          name: user.name.value,
          userId: user.id.value,
          role: user.role.value,
          password: user.password.value,
        },
      }),
    };
  }
}
