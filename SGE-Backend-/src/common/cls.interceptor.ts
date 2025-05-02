import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { ClsService } from 'nestjs-cls';
  
  @Injectable()
  export class ClsInterceptor implements NestInterceptor {
    constructor(private readonly cls: ClsService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req = context.switchToHttp().getRequest();
  
      // Se asume que el ID del usuario autenticado está en req.user.sub
      const usuarioId = req.user?.sub || 0;
  
      this.cls.set('usuarioId', usuarioId); // Guardamos en CLS
      return next.handle();
    }
  }
  