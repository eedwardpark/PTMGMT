import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entity/patient.entity';
import { ClinicService } from '../clinic/clinic.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Clinic } from 'src/clinic/entity/clinic.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,

    private readonly clinicService: ClinicService,
  ) {}

  /**
   * Create a new Patient using validated DTO.
   * 1) Lookup Clinic by createDto.clinicAcronym (throws 400 if not found).
   * 2) Generate EHR ID if createDto.ehrId is omitted.
   * 3) Ensure unique EHR ID (throws 400 if duplicate).
   * 4) Save & return the Patient (with nested clinic).
   */
  async create(createDto: CreatePatientDto): Promise<Patient> {
    // 1) Find or fail the Clinic
    const clinic = await this.clinicService.findByAcronym(
      createDto.clinicAcronym.trim(),
    );
    if (!clinic) {
      throw new BadRequestException(
        `Clinic with acronym "${createDto.clinicAcronym}" not found.`,
      );
    }

    // 2) Determine finalEhrId
    let finalEhrId: string;
    if (createDto.ehrId?.trim()) {
      finalEhrId = createDto.ehrId.trim();
    } else {
      // auto-generate: ACR + MMDDYYYY + FI + LI
      const dob = new Date(createDto.dateOfBirth);
      const mm = String(dob.getMonth() + 1).padStart(2, '0');
      const dd = String(dob.getDate()).padStart(2, '0');
      const yyyy = dob.getFullYear();
      const fi = createDto.firstName.trim()[0].toUpperCase();
      const li = createDto.lastName.trim()[0].toUpperCase();
      finalEhrId = `${createDto.clinicAcronym.trim()}${mm}${dd}${yyyy}${fi}${li}`;
      if (finalEhrId.length > 20) {
        throw new BadRequestException(
          'Auto-generated EHR ID exceeds 20 characters.',
        );
      }
    }

    // 3) Check uniqueness of finalEhrId
    const existing = await this.patientRepo.findOne({
      where: { ehrId: finalEhrId },
    });
    if (existing) {
      throw new BadRequestException(
        `EHR ID "${finalEhrId}" is already in use.`,
      );
    }

    // 4) Create & save
    const patient = this.patientRepo.create({
      clinic: clinic,
      ltc: createDto.ltc?.trim() || null,
      lastName: createDto.lastName.trim(),
      firstName: createDto.firstName.trim(),
      middleName: createDto.middleName?.trim() || null,
      gender: createDto.gender,
      dateOfBirth: new Date(createDto.dateOfBirth),
      phone: createDto.phone.trim(),
      ehrId: finalEhrId,
    } as Partial<Patient>);
    return this.patientRepo.save(patient);
  }

  /**
   * List all patients (with their Clinic obj).
   */
  async findAll(): Promise<Patient[]> {
    return this.patientRepo.find({
      relations: ['clinic'],
      order: { id: 'DESC' },
    });
  }

  /**
   * Find one patient by ID.
   * Throws BadRequestException if id is not a positive integer.
   * Throws NotFoundException if no such patient.
   */
  async findOne(id: string): Promise<Patient> {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId < 1) {
      throw new BadRequestException('Patient ID must be a positive integer.');
    }

    const patient = await this.patientRepo.findOne({
      where: { id: numericId },
      relations: ['clinic'],
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${numericId} not found.`);
    }
    return patient;
  }

  /**
   * Delete a patient by ID.
   * Throws BadRequestException if id invalid.
   * Throws NotFoundException if no row deleted.
   */
  async remove(id: string): Promise<void> {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId < 1) {
      throw new BadRequestException('Patient ID must be a positive integer.');
    }

    const result = await this.patientRepo.delete(numericId);
    if (result.affected === 0) {
      throw new NotFoundException(`Patient with ID ${numericId} not found.`);
    }
  }
}
