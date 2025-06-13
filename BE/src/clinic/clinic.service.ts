import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinic } from './entity/clinic.entity';
import { CreateClinicDto } from './dto/create-clinic.dto';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinicRepo: Repository<Clinic>,
  ) {}

  async create(createDto: CreateClinicDto): Promise<Clinic> {
    const acronym = createDto.acronym.trim();
    const clinicName = createDto.clinicName.trim();

    const existing = await this.clinicRepo.findOne({ where: { acronym } });
    if (existing) {
      throw new BadRequestException(`Clinic with acronym "${acronym}" already exists.`);
    }

    const clinic = this.clinicRepo.create({ acronym, clinicName });
    return this.clinicRepo.save(clinic);
  }

  async findAll(): Promise<Clinic[]> {
    return this.clinicRepo.find({ order: { clinicName: 'ASC' } });
  }

  async findByAcronym(acronym: string): Promise<Clinic | null> {
    return this.clinicRepo.findOne({ where: { acronym } });
  }
}
