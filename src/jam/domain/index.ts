import { AttendeeSchema } from '../infra/schema/attendee.schema';
import { JamSessionSchema } from '../infra/schema/jamSession.schema';
import { JamSessionRepository } from './repository/jamSession.repository';

export const JamSessionEntites = [JamSessionSchema, AttendeeSchema];
export const JamSessionRepositoris = [JamSessionRepository];
