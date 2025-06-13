import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entity/patient.entity';
import { Clinic } from '../clinic/entity/clinic.entity';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { ClinicModule } from '../clinic/clinic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, Clinic]),  
    ClinicModule,
  ],
  providers: [PatientService],
  controllers: [PatientController],
})
export class PatientModule {}
