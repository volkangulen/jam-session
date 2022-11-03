import { RequestWithPayload } from '@common/dto/payload.dto';
import { AttendJamSessionRequest } from 'src/jam/presentation/dto/attendee.dto';

export class JamSessionAttendCommand {
  constructor(public readonly attendSessionRequest: RequestWithPayload<AttendJamSessionRequest>) {}
}
