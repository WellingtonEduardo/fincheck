import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const userId = req.userId;

    if (!userId) {
      throw new UnauthorizedException();
    }

    return userId;
  },
);
