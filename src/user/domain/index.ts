import { UserSchema } from 'src/user/infra/schema/user.schema';
import { UserRepository } from './repository/user.repository';

export const UserEntites = [UserSchema];
export const UserRepositories = [UserRepository];
