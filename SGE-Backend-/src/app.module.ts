import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpedientesModule } from './expedientes/expedientes.module';
import { PrestamosModule } from './prestamos/prestamos.module';
import { MedicosModule } from './medicos/medicos.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientosModule } from './movimientos/movimientos.module';
import { UmfModule } from './umf/umf.module';
import { SearchModule } from './search/search.module';
import { ObservacionesModule } from './observaciones/observaciones.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CommonModule } from './common/common.module';
import { RequestContextMiddleware } from './common/request-context.middleware';

import { ClsModule } from 'nestjs-cls';
import { ClsInterceptor } from './common/cls.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
      logging: true,
      autoLoadEntities: true,
      synchronize: true,
      ssl: false,
     
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true, // Esto reemplaza el `middleware: true` anterior
      },
    }),
    ExpedientesModule,
    PrestamosModule,
    MedicosModule,
    EspecialidadesModule,
    MovimientosModule,
    UmfModule,
    SearchModule,
    ObservacionesModule,
    AuthModule,
    UsuariosModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClsInterceptor,
    },
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
