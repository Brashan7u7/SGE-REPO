import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { jwtConstants } from './jwt.constants.secret';
import { Reflector } from '@nestjs/core';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [
    forwardRef(() => UsuariosModule),
    JwtModule.register({
      secret: 'Clavesecreta',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, Reflector],
  exports: [AuthGuard, JwtModule, AuthService, JwtModule],
})
export class AuthModule {}
export { jwtConstants };
