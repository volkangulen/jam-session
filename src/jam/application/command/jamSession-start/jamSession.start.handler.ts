import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { JamSessionRepository } from 'src/jam/domain/repository/jamSession.repository';
import { JamSessionMapper } from 'src/jam/infra/mapper/jamSession.mapper';
import { JamSessionStartCommand } from './jamSession.start.command';

@CommandHandler(JamSessionStartCommand)
export class JamSessionStartHandler implements ICommandHandler<JamSessionStartCommand> {
  constructor(
    private readonly _repository: JamSessionRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async execute(command: JamSessionStartCommand): Promise<void> {
    const session = await this._repository.findOne(
      command.startSessionRequest.request.jamSessionId,
    );
    if (!session) {
      throw Error(`Session ${command.startSessionRequest.request.jamSessionId} Not found`);
    }
    const jamSession = this.eventPublisher.mergeObjectContext(
      await session.start(),
    );
    this._repository.save(JamSessionMapper.toPersistence(jamSession));
  }
}
