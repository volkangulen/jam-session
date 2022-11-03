import { GetCurrentUser } from '@common/decorator/get.user.decorator';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { OwnerGuard } from 'src/auth/owner.guard';
import { JamSessionAttendCommand } from 'src/jam/application/command/jamSession-attend/jamSession.attend.command';
import { JamSessionCreateCommand } from 'src/jam/application/command/jamSession-create/jamSession.create.command';
import { JamSessionStartCommand } from 'src/jam/application/command/jamSession-start/jamSession.start.command';
import { JamSessionGetQuery } from 'src/jam/application/query/jamSession-get/jamSession.get.query';
import { JamSessionListQuery } from 'src/jam/application/query/jamSession-list/jamSession.list.query';
import { JamSession } from 'src/jam/domain/entity/jamSession.entity';
import { UserPayload } from 'src/user/presentation/dto/token.dto';
import { AttendJamSessionRequest } from '../dto/attendee.dto';
import { JamSessionCreateRequest } from '../dto/jamSession.dto';

@Controller('jam')
@UseGuards(JwtAuthGuard)
export class JamSessionController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get('get/:id')
  async getSession(@Param('id') id: string): Promise<JamSession> {
    return this.queryBus.execute<JamSessionGetQuery, JamSession>(new JamSessionGetQuery({ id }));
  }
  @Get('getAll')
  async getSessions(): Promise<JamSession[]> {
    return this.queryBus.execute<JamSessionListQuery, JamSession[]>(new JamSessionListQuery());
  }

  @Post('create')
  async createJamSession(
    @GetCurrentUser() user: UserPayload,
    @Body() jamSessionCreateRequest: JamSessionCreateRequest,
  ): Promise<JamSession> {
    const created = await this.commandBus.execute<JamSessionCreateCommand, JamSession>(
      new JamSessionCreateCommand({ payload: user, request: jamSessionCreateRequest }),
    );
    return created;
  }

  @Post('attend')
  async attendJamSession(
    @GetCurrentUser() user: UserPayload,
    @Body() attendJamSessionRequest: AttendJamSessionRequest,
  ): Promise<JamSession> {
    const created = await this.commandBus.execute<JamSessionAttendCommand, JamSession>(
      new JamSessionAttendCommand({ payload: user, request: attendJamSessionRequest }),
    );
    return created;
  }

  @Patch('start')
  @UseGuards(OwnerGuard)
  async startJamSession(
    @GetCurrentUser() user: UserPayload,
    @Body() startJamSessionRequest: AttendJamSessionRequest,
  ): Promise<JamSession> {
    const created = await this.commandBus.execute<JamSessionStartCommand, JamSession>(
      new JamSessionStartCommand({ payload: user, request: startJamSessionRequest }),
    );
    return created;
  }
}
