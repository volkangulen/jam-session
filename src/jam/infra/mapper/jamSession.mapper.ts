import { RequestWithPayload } from '@common/dto/payload.dto';
import { JamSessionStatus } from '@common/enum/jamSessionStatus.enum';
import { Description } from '@common/vo/description';
import { Role } from '@common/vo/role';
import { Title } from '@common/vo/title';
import { UniqueID } from '@common/vo/unique.id';
import { Attendee } from 'src/jam/domain/entity/attendee.entity';
import { JamSession } from 'src/jam/domain/entity/jamSession.entity';
import {
  JamSessionCreateRequest,
  JamSessionResponse,
} from 'src/jam/presentation/dto/jamSession.dto';
import { UserMapper } from 'src/user/infra/mapper/user.mapper';
import { JamSessionSchema } from '../schema/jamSession.schema';
import { AttendeeMapper } from './attendee.mapper';

export class JamSessionMapper {
  public static async DBtoDomain(model: JamSessionSchema): Promise<JamSession> {
    const session = await JamSession.create({
      title: await Title.create(model.title),
      description: await Description.create(model.description),
      id: await UniqueID.create(model.id),
      status:
        JamSessionStatus[
          Object.keys(JamSessionStatus).find((q) => JamSessionStatus[q] == model.status)
        ],
      spots: await Promise.all(model.spots?.map(AttendeeMapper.toDomain) ?? []),
      owner: await UserMapper.DBtoDomain(model.owner),
    });
    return session;
  }
  public static async DTOtoDomain(
    model: RequestWithPayload<JamSessionCreateRequest>,
  ): Promise<JamSession> {
    const session = await JamSession.create({
      title: await Title.create(model.request.title),
      description: await Description.create(model.request.description),
      id: await UniqueID.create(undefined),
      status: JamSessionStatus.CREATED,
      owner: await UserMapper.DTOtoDomain({ ...model.payload, id: model.payload.userId }, false),
      spots: await Promise.all(
        model.request.roles.map(
          async (role) =>
            await Attendee.create({
              role: await Role.create(role),
              id: await UniqueID.create(undefined),
            }),
        ),
      ),
    });
    return session;
  }

  public static toPersistence(jamSession: JamSession): Partial<JamSessionSchema> {
    const model = {
      id: jamSession.id.value,
      title: jamSession.title.value,
      description: jamSession.description.value,
      status: jamSession.status,
      owner: UserMapper.toPersistence(jamSession.owner),
      spots: jamSession.spots.map(AttendeeMapper.toPersistence),
    };
    return model;
  }

  public static toDTO(jamSession: JamSession): JamSessionResponse {
    return {
      id: jamSession.id.value,
      title: jamSession.title.value,
      description: jamSession.description.value,
      spots: jamSession.spots.map(AttendeeMapper.toDTO),
    };
  }
}
