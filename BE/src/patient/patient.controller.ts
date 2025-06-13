import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entity/patient.entity';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  /**
   * POST /patients
   * Body → CreatePatientDto
   * Returns the new Patient with nested Clinic.
   * ValidationPipe automatically enforces DTO rules.
   */
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() createDto: CreatePatientDto): Promise<Patient> {
    return this.patientService.create(createDto);
  }

  /**
   * GET /patients/:id
   * Param 'id' is a string, but we convert in service; no need for ParseIntPipe because
   * we do manual numeric check and throw 400 if invalid.
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Patient> {
    return this.patientService.findOne(id);
  }

  /**
   * DELETE /patients/:id
   * Returns 204 No Content on success.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.patientService.remove(id);
  }

  /**
   * GET /patients
   * Returns an array of all patients (with clinic info).
   */
  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }
}
