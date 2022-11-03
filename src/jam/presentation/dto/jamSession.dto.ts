import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { AttendeeResponse } from './attendee.dto';

export class JamSessionCreateRequest {
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsArray()
  roles: [string];
}

export interface JamSessionResponse {
  id: string;
  description: string;
  title: string;
  spots?: AttendeeResponse[];
}
