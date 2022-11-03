import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JamSessionMapper } from 'src/jam/infra/mapper/jamSession.mapper';
import { JamSessionSchema } from 'src/jam/infra/schema/jamSession.schema';
import { Repository } from 'typeorm';
import { JamSession } from '../entity/jamSession.entity';

@Injectable()
export class JamSessionRepository {
  constructor(
    @InjectRepository(JamSessionSchema)
    private _repository: Repository<JamSessionSchema>,
  ) {}

  async findAll(): Promise<JamSession[]> {
    const result = await this._repository.find({
      relations: {
        spots: true,
        owner: true,
      },
    });
    return Promise.all(result.map((session) => JamSessionMapper.DBtoDomain(session)));
  }
  async save(jamSession: Partial<JamSessionSchema>): Promise<JamSession> {
    const saved = await this._repository.save(jamSession);
    return JamSessionMapper.DBtoDomain(saved);
  }

  async findOne(id: string): Promise<JamSession> {
    const result = await this._repository.findOneOrFail({
      where: { id: id },
      relations: {
        owner: true,
        spots: true,
      },
    });
    return JamSessionMapper.DBtoDomain(result);
  }

  async remove(id: string): Promise<void> {
    await this._repository.delete(id);
  }
}
