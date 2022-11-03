import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

const EXPIRE_TIME: string = '15m';
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (_configService: ConfigService) => ({
        secret: _configService.get<string>('API_KEY'),
        signOptions: { expiresIn: EXPIRE_TIME },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  providers: [JwtStrategy],
  exports: [JwtModule],
  controllers: [],
})
export class AuthModule {}
