import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Patient } from '../../patient/entity/patient.entity';

@Entity({ name: 'clinic' })
export class Clinic {
  @PrimaryGeneratedColumn({ name: 'clinic_id' })
  clinicId: number;

  @Column({ type: 'varchar', length: 3, unique: true })
  acronym: string;

  @Column({ type: 'varchar', length: 100 })
  clinicName: string;

  @OneToMany(() => Patient, (patient) => patient.clinic)
  patients: Patient[];
}
