import { UserLoginRequest } from 'src/user/presentation/dto/user.dto';

export class UserLoginCommand {
  constructor(public readonly userLoginRequest: UserLoginRequest) {}
}
