import { RequestWithPayload } from '@common/dto/payload.dto';
import { AttendJamSessionRequest } from 'src/jam/presentation/dto/attendee.dto';

export class JamSessionStartCommand {
  constructor(public readonly startSessionRequest: RequestWithPayload<AttendJamSessionRequest>) {}
}
