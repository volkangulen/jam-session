import { UniqueID } from '@common/vo/unique.id';
import { Role } from '@common/vo/role';
import { User } from 'src/user/domain/entity/user.entity';

interface AttendeeProps {
  role: Role;
  id: UniqueID;
  user?: User;
}

export class Attendee {
  private readonly _role: Role;
  private readonly _id: UniqueID;
  private readonly _user?: User;

  private constructor(props: AttendeeProps) {
    this._role = props.role;
    this._id = props.id;
    this._user = props.user;
  }
  get id() {
    return this._id;
  }
  get role() {
    return this._role;
  }
  get user() {
    return this._user;
  }

  public static async create(props: AttendeeProps): Promise<Attendee> {
    return new Attendee(props);
  }
}
