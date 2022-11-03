import { BadRequestException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JamSessionRepository } from 'src/jam/domain/repository/jamSession.repository';
import { JamSessionMapper } from 'src/jam/infra/mapper/jamSession.mapper';
import { JamSessionResponse } from 'src/jam/presentation/dto/jamSession.dto';
import { JamSessionGetQuery } from './jamSession.get.query';

@QueryHandler(JamSessionGetQuery)
export class JamSessionGetHandler implements IQueryHandler<JamSessionGetQuery> {
  constructor(private readonly _repository: JamSessionRepository) {}

  async execute({ getRequest }: JamSessionGetQuery): Promise<JamSessionResponse> {
    try{
     const session=await this._repository.findOne(getRequest.id);
      return JamSessionMapper.toDTO(session);

    }
    catch{// EntityNotFoundError
      throw new BadRequestException("Session not found!")
    }
  }
}
