import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserCommandHandlers } from './application/command';
import { UserEntites, UserRepositories } from './domain';
import { UserController } from './presentation/controller/user.controller';

@Module({
  imports: [CqrsModule, AuthModule, TypeOrmModule.forFeature([...UserEntites])],
  controllers: [UserController],
  providers: [...UserRepositories, ...UserCommandHandlers],
})
export class UserModule {}
