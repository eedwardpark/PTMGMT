import {
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(3, { message: 'clinicAcronym must be exactly 3 characters.' })
  clinicAcronym: string;

  @IsOptional()
  @IsString()
  @MaxLength(20, { message: 'ltc can be at most 20 characters.' })
  ltc?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'lastName can be at most 50 characters.' })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'firstName can be at most 50 characters.' })
  firstName: string;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'middleName can be at most 50 characters.' })
  middleName?: string;

  @IsNotEmpty()
  @IsEnum(['M', 'F'], { message: 'gender must be one of "M", "F"' })
  gender: 'M' | 'F';

  @IsNotEmpty()
  @IsDateString({}, { message: 'dateOfBirth must be a valid ISO date (YYYY-MM-DD).' })
  dateOfBirth: string;

  @IsNotEmpty()
  @Matches(/^\d{3}-\d{3}-\d{4}$/, {
    message: 'phone must be in the format ###-###-####.',
  })
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(20, { message: 'ehrId can be at most 20 characters.' })
  ehrId?: string;
}
