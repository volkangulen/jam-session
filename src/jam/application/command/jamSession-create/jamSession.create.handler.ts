import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { JamSessionRepository } from 'src/jam/domain/repository/jamSession.repository';
import { JamSessionCreateCommand } from './jamSession.create.command';
import { JamSession } from 'src/jam/domain/entity/jamSession.entity';
import { JamSessionMapper } from 'src/jam/infra/mapper/jamSession.mapper';

@CommandHandler(JamSessionCreateCommand)
export class JamSessionCreateHandler implements ICommandHandler<JamSessionCreateCommand> {
  constructor(
    private readonly _repository: JamSessionRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ createSessionRequest }: JamSessionCreateCommand): Promise<string> {
    const jamSession = this.eventPublisher.mergeObjectContext(
      await JamSession.create(await JamSessionMapper.DTOtoDomain(createSessionRequest)),
    );
    const dbm=JamSessionMapper.toPersistence(jamSession);
    const created = await this._repository.save(dbm);
    if (created) jamSession.commit();
    else {
      jamSession.uncommit();
    }
    return created.id.value;
  }
}
