// user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // 'data' is any argument passed to @User() decorator, e.g., @User('userId')
    return data ? request.user : request.user;
  },
);