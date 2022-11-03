import { JamSessionAttendHandler } from './jamSession-attend/jamSession.attend.handler';
import { JamSessionCreateHandler } from './jamSession-create/jamSession.create.handler';
import { JamSessionStartHandler } from './jamSession-start/jamSession.start.handler';

export const JamSessionCommandHandlers = [JamSessionCreateHandler,JamSessionAttendHandler,JamSessionStartHandler];
