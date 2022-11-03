import { GetWithIdRequestProps } from '@common/dto/get.request.dto';

export class JamSessionGetQuery {
  constructor(public getRequest: GetWithIdRequestProps) {}
}
