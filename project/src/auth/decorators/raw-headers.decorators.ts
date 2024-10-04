import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RawHeaders = createParamDecorator(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (data: string | string[], ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const rawHeaders = req.rawHeaders;
    return rawHeaders;
  },
);
