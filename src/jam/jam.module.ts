import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JamSessionCommandHandlers } from './application/command';
import { JamSessionQueryHandlers } from './application/query';
import { JamSessionEntites, JamSessionRepositoris } from './domain';
import { JamSessionController } from './presentation/controller/jamSession.controller';

@Module({
  imports: [CqrsModule, AuthModule, TypeOrmModule.forFeature([...JamSessionEntites])],
  controllers: [JamSessionController],
  providers: [
    ...JamSessionRepositoris,
    ...JamSessionCommandHandlers,
    ...JamSessionQueryHandlers,
  ],
})
export class JamSessionModule {}
