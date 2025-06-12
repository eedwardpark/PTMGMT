import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { Clinic } from './entity/clinic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic])],
  providers: [ClinicService],
  controllers: [ClinicController],
  exports: [ClinicService],
})
export class ClinicModule {}