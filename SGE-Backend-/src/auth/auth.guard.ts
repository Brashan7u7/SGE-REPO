import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Verifica si la ruta tiene el decorador @Public()
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true; // Permitir acceso sin autenticación
    }

    const token = this.extractTokenFromHeader(request);
    

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'Clavesecreta',
      });

     

      const requiredRole = this.reflector.get<string[]>(
        'role',
        context.getHandler(),
      );

  

      if (requiredRole && !requiredRole.includes(payload.role)) {
        throw new ForbiddenException(
          `Acceso denegado para el rol: ${payload.role}`,
        );
      }

      request['user'] = payload;
     

      return true;
    } catch (error) {
      console.error('Error al verificar el token:', error.message);
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('Token no proporcionado');
    }
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Formato de token inválido');
    }
    return token;
  }
}
