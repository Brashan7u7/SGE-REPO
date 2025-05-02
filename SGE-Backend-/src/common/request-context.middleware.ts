// src/common/middleware/request-context.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';


import { NextFunction } from 'express';
import { RequestContext } from './request-context.service';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    
    const usuarioId = req.user?.sub ?? 0;
    RequestContext.run({ usuarioId }, () => next());
  }
}
