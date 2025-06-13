import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { Clinic } from './entity/clinic.entity';

@Controller('clinics')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  /**
   * POST /clinics
   * Body → CreateClinicDto
   * Returns the newly created Clinic.
   * ValidationPipe will throw 400 if DTO constraints fail.
   */
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() createDto: CreateClinicDto): Promise<Clinic> {
    return this.clinicService.create(createDto);
  }
}
