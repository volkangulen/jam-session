import { Email } from '@common/vo/email';
import { Name } from '@common/vo/name';
import { Password } from '@common/vo/password';
import { Role } from '@common/vo/role';
import { UniqueID } from '@common/vo/unique.id';
import { UserRegisterRequest } from 'src/user/presentation/dto/user.dto';
import { UserSchema } from 'src/user/infra/schema/user.schema';
import { User } from 'src/user/domain/entity/user.entity';

export class UserMapper {
  public static async DTOtoDomain(
    dto: UserRegisterRequest & { id?: string },
    validatePassword: boolean,
  ): Promise<User> {
    const attendee = await User.create({
      name: await Name.create(dto.name),
      role: await Role.create(dto.role),
      email: await Email.create(dto.email),
      id: await UniqueID.create(dto.id),
      password: await Password.create(dto.password, validatePassword),
    });
    return attendee;
  }
  public static async DBtoDomain(dbModel?: UserSchema): Promise<User> {
    if (!!dbModel) {
      const user = await User.create({
        id: await UniqueID.create(dbModel.id),
        name: await Name.create(dbModel.name),
        role: await Role.create(dbModel.role),
        email: await Email.create(dbModel.email),
        password: await Password.create(dbModel.password, false),
      });
      return user;
    }
    return undefined;
  }

  public static toPersistence(user: User): UserSchema {
    return user
      ? {
          id: user.id.value,
          role: user.role.value,
          name: user.name.value,
          email: user.email.value,
          password: user.password.value,
          ownedSessions: undefined,
          attendances: undefined,
        }
      : null;
  }
}
