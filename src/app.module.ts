// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicModule } from './clinic/clinic.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',       
      port: 3306,                 // your MySQL port
      username: 'root',
      password: process.env.MYSQL_PW, // using the correct environment variable
      database: 'patient_management',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
      // ⚠️ For production, switch synchronize:false and use migrations.
    }),
    ClinicModule,
    PatientModule
  ],
})
export class AppModule {}
