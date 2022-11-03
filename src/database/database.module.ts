import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        bigNumberStrings: false,
        schema: null,
        synchronize: true,
        keepConnectionAlive: true,
        autoLoadEntities: true,
        entities: ['dist/**/*.entity.{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
