import { UserRegisterRequest } from "src/user/presentation/dto/user.dto";

export class UserRegisterCommand {
  constructor(public readonly userRegisterRequest: UserRegisterRequest) {}
}
