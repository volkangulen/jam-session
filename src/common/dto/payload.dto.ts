import { UserPayload } from 'src/user/presentation/dto/token.dto';

export interface RequestWithPayload<T> {
  request: T;
  payload: UserPayload;
}
