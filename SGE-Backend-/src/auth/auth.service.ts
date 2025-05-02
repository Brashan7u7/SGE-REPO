import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  private readonly secretKey = 'Clavesecreta';

  constructor(
    private jwtService: JwtService,
    private readonly usuarioService: UsuariosService,
  ) {}

  async signIn(
    correo: string,
    contrasena: string,
  ): Promise<{ access_token: string; role: string; id: number; nombre: string }> {
   

    const usuario = await this.usuarioService.findOneEmail(correo);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      contrasena,
      usuario.contrasena,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const role = usuario.esAdmin ? 'admin' : 'arimac';
    const id = usuario.id_usuario;
    const nombre = usuario.nombre;

    

    const payload = { sub: id, email: usuario.correo, role };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.secretKey,
    });

    return { access_token, role, id, nombre };
  }
}
