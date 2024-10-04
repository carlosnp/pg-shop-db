import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { pickProperties } from 'src/pg-shop';

export const GetCustomUser = createParamDecorator(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (data: string | string[], ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
      throw new InternalServerErrorException('User not found (decorator)');
    }
    if (!data) {
      return user;
    }
    if (typeof data === 'string') {
      return user[data];
    }
    return pickProperties(user, data);
  },
);
