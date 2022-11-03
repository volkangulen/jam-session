import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JamSessionRepository } from 'src/jam/domain/repository/jamSession.repository';
import { JamSessionMapper } from 'src/jam/infra/mapper/jamSession.mapper';
import { JamSessionResponse } from 'src/jam/presentation/dto/jamSession.dto';
import { JamSessionListQuery } from './jamSession.list.query';

@QueryHandler(JamSessionListQuery)
export class JamSessionListHandler implements IQueryHandler<JamSessionListQuery> {
  constructor(private readonly _repository: JamSessionRepository) {}

  async execute(): Promise<JamSessionResponse[]> {
    const sessions = await this._repository.findAll();
    return sessions.map(JamSessionMapper.toDTO);
  }
}
