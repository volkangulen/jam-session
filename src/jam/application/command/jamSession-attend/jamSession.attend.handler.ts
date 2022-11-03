import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { JamSessionRepository } from 'src/jam/domain/repository/jamSession.repository';
import { JamSessionAttendCommand } from './jamSession.attend.command';
import { AttendeeMapper } from 'src/jam/infra/mapper/attendee.mapper';
import { JamSessionMapper } from 'src/jam/infra/mapper/jamSession.mapper';
import { JamSessionResponse } from 'src/jam/presentation/dto/jamSession.dto';

@CommandHandler(JamSessionAttendCommand)
export class JamSessionAttendHandler implements ICommandHandler<JamSessionAttendCommand> {
  constructor(
    private readonly _repository: JamSessionRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ attendSessionRequest }: JamSessionAttendCommand): Promise<JamSessionResponse> {
    const session = await this._repository.findOne(attendSessionRequest.request.jamSessionId);
    if (!session) {
      throw Error(`Session ${attendSessionRequest.request.jamSessionId} Not found`);
    }
    const dbm = await AttendeeMapper.DTOtoDomain(attendSessionRequest.payload);
    const dbm2 = await session.createAttendee(dbm);
    const jamSession = this.eventPublisher.mergeObjectContext(dbm2);
    this._repository.save(JamSessionMapper.toPersistence(jamSession));
    return JamSessionMapper.toDTO(jamSession);
  }
}
