import { JamSessionGetHandler } from './jamSession-get/jamSession.get.handler';
import { JamSessionListHandler } from './jamSession-list/jamSession.list.handler';
export const JamSessionQueryHandlers = [
  JamSessionListHandler,
  JamSessionGetHandler,
];
