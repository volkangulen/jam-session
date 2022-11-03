import { BaseSchema } from '@common/entity/db.model';
import { UserSchema } from 'src/user/infra/schema/user.schema';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { JamSessionSchema } from './jamSession.schema';

const ENTITY_NAME = 'attendee';
@Entity(ENTITY_NAME)
export class AttendeeSchema extends BaseSchema {
  @Column({
    type: 'varchar',
    name: 'role',
    length: '255',
  })
  role: string;

  @ManyToOne(() => JamSessionSchema, (jamSession) => jamSession.spots, {
    nullable: false,
  })
  @JoinColumn({
    name: 'jam_session_id',
  })
  jamSession: JamSessionSchema;

  @ManyToOne(() => UserSchema, (user) => user.attendances, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: UserSchema;

  constructor(id: string, role: string, user: UserSchema) {
    super(id);
    this.role = role;
    this.user = user;
  }
}
