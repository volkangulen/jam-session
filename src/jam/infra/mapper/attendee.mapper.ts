import { Role } from '@common/vo/role';
import { UniqueID } from '@common/vo/unique.id';
import { Attendee } from 'src/jam/domain/entity/attendee.entity';
import { AttendeeResponse } from 'src/jam/presentation/dto/attendee.dto';
import { UserMapper } from 'src/user/infra/mapper/user.mapper';
import { UserPayload } from 'src/user/presentation/dto/token.dto';
import { AttendeeSchema } from '../schema/attendee.schema';

export class AttendeeMapper {
  public static async DTOtoDomain(dto: UserPayload): Promise<Attendee> {
    const attendee = await Attendee.create({
      role: await Role.create(dto.role),
      id: await UniqueID.create(dto.userId ?? undefined),
      user: await UserMapper.DTOtoDomain({ ...dto, id: dto.userId }, false),
    });
    return attendee;
  }
  public static async toDomain(dbModel: AttendeeSchema): Promise<Attendee> {
    const attendee = await Attendee.create({
      id: await UniqueID.create(dbModel.id),
      role: await Role.create(dbModel.role),
      user: await UserMapper.DBtoDomain(dbModel.user),
    });
    return attendee;
  }

  public static toPersistence(attendee: Attendee): AttendeeSchema {
    return new AttendeeSchema(
      attendee.id.value,
      attendee.role.value,
      UserMapper.toPersistence(attendee.user),
    );
  }

  public static toDTO(attendee: Attendee): AttendeeResponse {
    return {
      id: attendee.id.value,
      performer: attendee.user?.name?.value ?? null,
      role: attendee.role.value,
    };
  }
}
