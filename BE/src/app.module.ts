import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicModule } from './clinic/clinic.module';
import { PatientModule } from './patient/patient.module';
import { Clinic } from './clinic/entity/clinic.entity';
import { Patient } from './patient/entity/patient.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        type: 'mysql',
        host: cs.get('MYSQL_HOST'),
        port: 3306,
        username: cs.get('MYSQL_USER'),
        password: cs.get('MYSQL_PW'),
        database: cs.get('MYSQL_DB'),
        entities: [Clinic, Patient],
        synchronize: true,
      }),
    }),

    ClinicModule,
    PatientModule,
  ],
})
export class AppModule {}
