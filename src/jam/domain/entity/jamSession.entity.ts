import { Title } from '@common/vo/title';
import { Description } from '@common/vo/description';
import { AggregateRoot } from '@nestjs/cqrs';
import { UniqueID } from '@common/vo/unique.id';
import { Attendee } from './attendee.entity';
import { User } from 'src/user/domain/entity/user.entity';
import { ForbiddenException } from '@nestjs/common';
import { JamSessionStatus } from '@common/enum/jamSessionStatus.enum';

interface JamSessionProps {
  description: Description;
  title: Title;
  id: UniqueID;
  owner: User;
  status: JamSessionStatus;
  spots?: Attendee[];
}

export class JamSession extends AggregateRoot {
  private readonly _description: Description;
  private readonly _title: Title;
  private readonly _id: UniqueID;
  private readonly _owner: User;
  private _status: JamSessionStatus;
  private _spots: Attendee[] = [];

  private constructor(props: JamSessionProps) {
    super();
    this._description = props.description;
    this._title = props.title;
    this._id = props.id;
    this._owner = props.owner;
    this._status = props.status;
    this._spots = props.spots ?? [];
  }

  get id() {
    return this._id;
  }

  get description() {
    return this._description;
  }
  get title() {
    return this._title;
  }
  get owner() {
    return this._owner;
  }
  get spots() {
    return this._spots;
  }
  get status() {
    return this._status;
  }

  public static async create(props: JamSessionProps): Promise<JamSession> {
    return new JamSession(props);
  }

  public async start() {
    if (this._status != JamSessionStatus.READY) {
      throw new ForbiddenException('Status not ready');
    }
    this._status = JamSessionStatus.STARTED;
    return this;
  }
  public async ready() {
    if (this._status != JamSessionStatus.CREATED) {
      throw new ForbiddenException('Status not valid');
    }
    this._status = JamSessionStatus.READY;
    return this;
  }

  private async checkReady() {
    return this._spots.every((q) => !!q.user);
  }
  public async createAttendee(attendee: Attendee): Promise<JamSession> {
    const duplicate = this._spots.some((spot) => spot.user?.id?.value === attendee.user.id.value);
    if (duplicate) {
      throw new ForbiddenException('Cannot attend twice');
    }

    const emptySpot = this._spots.find(
      (spot) => spot.role.value === attendee.role.value && !spot.user,
    );
    if (!emptySpot) {
      throw new ForbiddenException('Role not available');
    }
    const rest = this._spots.filter((spot) => spot.id.value !== emptySpot.id.value);
    this._spots = [
      ...rest,
      await Attendee.create({ id: emptySpot.id, user: attendee.user, role: attendee.role }),
    ];

    //TODO: Create event handler for filledSpot. Update status with the handler.
    if (this.checkReady()) {
      this.ready();
    }

    return this;
  }
}
