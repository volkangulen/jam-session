import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMapper } from 'src/user/infra/mapper/user.mapper';
import { UserSchema } from 'src/user/infra/schema/user.schema';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private _repository: Repository<UserSchema>,
  ) {}

  async save(user: UserSchema): Promise<User> {
    const saved = await this._repository.save(user);
    return UserMapper.DBtoDomain(saved);
  }

  async findOne(email: string): Promise<User> {
    const result = await this._repository.findOne({
      where: {
        email: email,
      },
    });
    if (!result) {
      return null;
    }
    return UserMapper.DBtoDomain(result);
  }

  async remove(id: string): Promise<void> {
    await this._repository.delete(id);
  }
}
