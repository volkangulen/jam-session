import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from 'src/user/presentation/dto/token.dto';

export const GetCurrentUser = createParamDecorator(
  (_: undefined, context: ExecutionContext): UserPayload => {
    const request = context.switchToHttp().getRequest();
    return request.user.payload as UserPayload;
  },
);
