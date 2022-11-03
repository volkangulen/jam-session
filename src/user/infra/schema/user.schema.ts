import { BaseSchema } from '@common/entity/db.model';
import { AttendeeSchema } from 'src/jam/infra/schema/attendee.schema';
import { JamSessionSchema } from 'src/jam/infra/schema/jamSession.schema';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

const ENTITY_NAME = 'user';
@Entity(ENTITY_NAME)
export class UserSchema extends BaseSchema {
  @Column({
    type: 'varchar',
    name: 'name',
    length: '50',
  })
  name: string;
  @Column({
    type: 'varchar',
    name: 'role',
    length: '255',
  })
  role: string;

  @Column({
    type: 'varchar',
    name: 'email',
    length: '255',
  })
  email: string;
  @Column({
    type: 'varchar',
    name: 'password',
    length: '100',
  })
  password: string;

  @OneToMany(() => JamSessionSchema, (jamSession) => jamSession.owner)
  ownedSessions: JamSessionSchema[];

  @OneToMany(() => AttendeeSchema, (attendee) => attendee.user)
  attendances: AttendeeSchema[];
}
