import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Clinic } from '../../clinic/entity/clinic.entity';

@Entity({ name: 'patients' })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Clinic, (clinic) => clinic.patients, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'clinic_id' })
  clinic: Clinic;

  @Column({ type: 'varchar', length: 20, nullable: true })
  ltc?: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50 })
  lastName: string;

  @Column({ name: 'first_name', type: 'varchar', length: 50 })
  firstName: string;

  @Column({ name: 'middle_name', type: 'varchar', length: 50, nullable: true })
  middleName?: string;

  @Column({ type: 'enum', enum: ['M', 'F', 'O'] })
  gender: 'M' | 'F';

  @Column({ type: 'date', name: 'dob' })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 12 })
  phone: string;

  @Column({ name: 'ehr_id', type: 'varchar', length: 20, unique: true })
  ehrId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
