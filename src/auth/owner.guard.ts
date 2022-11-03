import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JamSessionRepository } from 'src/jam/domain/repository/jamSession.repository';
import { UserPayload } from 'src/user/presentation/dto/token.dto';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly _repository: JamSessionRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionId: string = request.body.jamSessionId;

    const jamSession = await this._repository.findOne(sessionId);
    const user = request.user.payload as UserPayload;

    return jamSession.owner.id.value === user.userId;
  }
}
