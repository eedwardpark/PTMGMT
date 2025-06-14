import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicModule } from './clinic/clinic.module';
import { PatientModule } from './patient/patient.module';
import { Patient } from './patient/entity/patient.entity';
import { Clinic } from './clinic/entity/clinic.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_PW,
      database: 'patient_management',
      entities: [Clinic, Patient],
      synchronize: true,
    }),
    ClinicModule,
    PatientModule,
  ],
})
export class AppModule {}
