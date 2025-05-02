import { Module } from '@nestjs/common';
import { UmfService } from './umf.service';
import { UmfController } from './umf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Umf } from './entities/umf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Umf])],
  controllers: [UmfController],
  providers: [UmfService],
})
export class UmfModule {}
