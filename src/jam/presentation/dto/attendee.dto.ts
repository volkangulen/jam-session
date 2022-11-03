import { IsNotEmpty, IsString } from 'class-validator';

export class AttendJamSessionRequest {
  @IsNotEmpty()
  @IsString()
  jamSessionId: string;
}
export class AttendeeResponse {
  id: string;
  performer?: string;
  role: string;
}
