import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { JamSessionModule } from './jam/jam.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        API_KEY: Joi.string().required(),
      }),
      envFilePath: './.env',
    }),
    AuthModule,
    JamSessionModule,
    DatabaseModule,
    UserModule,
  ],
  exports: [ConfigModule],
})
export class AppModule {}
