import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/domain/entity/user.entity';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserMapper } from 'src/user/infra/mapper/user.mapper';
import { Token } from 'src/user/presentation/dto/token.dto';
import { UserRegisterCommand } from './user.register.command';

@CommandHandler(UserRegisterCommand)
export class UserRegisterHandler implements ICommandHandler<UserRegisterCommand> {
  constructor(
    private readonly _repository: UserRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _jwtService: JwtService,
  ) {}

  async execute({ userRegisterRequest }: UserRegisterCommand): Promise<Token> {
    const maybeUser = await this._repository.findOne(userRegisterRequest.email);
    if (maybeUser) {
      throw new BadRequestException('User exists!');
    }

    const user = this.eventPublisher.mergeObjectContext(
      await User.create(await UserMapper.DTOtoDomain(userRegisterRequest, true)),
    );
    const created = await this._repository.save(UserMapper.toPersistence(user));
    if (created) user.commit();
    else {
      user.uncommit();
    }
    return {
      accessToken: this._jwtService.sign({
        payload: {
          email: user.email.value,
          name: user.name.value,
          userId: user.id.value,
          role: user.role.value,
        },
      }),
    };
    // return created.id.value;
  }
}
