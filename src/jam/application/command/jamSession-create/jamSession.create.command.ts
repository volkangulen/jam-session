import { RequestWithPayload } from '@common/dto/payload.dto';
import { JamSessionCreateRequest } from 'src/jam/presentation/dto/jamSession.dto';

export class JamSessionCreateCommand {
  constructor(public readonly createSessionRequest: RequestWithPayload<JamSessionCreateRequest>) {}
}
