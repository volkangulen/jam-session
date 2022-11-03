import { BaseSchema } from '@common/entity/db.model';
import { UserSchema } from 'src/user/infra/schema/user.schema';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AttendeeSchema } from './attendee.schema';
// import { AttendeeSchema } from './attendee.schema';

const ENTITY_NAME = 'jam_session';
@Entity(ENTITY_NAME)
export class JamSessionSchema extends BaseSchema {
  @Column({
    type: 'varchar',
    name: 'description',
    length: '255',
  })
  description: string;
  @Column({
    type: 'varchar',
    name: 'status',
    length: '50',
  })
  status: string;
  @Column({
    type: 'varchar',
    name: 'title',
    length: '255',
  })
  title: string;

  @OneToMany(() => AttendeeSchema, (attendee) => attendee.jamSession, {
    cascade: true,
  })
  @JoinColumn({
    name: 'jam_session_id',
  })
  spots: AttendeeSchema[];

  @ManyToOne(() => UserSchema, (user) => user.ownedSessions)
  @JoinColumn({
    name: 'owner_id',
  })
  owner: UserSchema;
}
