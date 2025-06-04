import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class CreateClinicDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 3, { message: 'Acronym must be exactly 3 characters' })
  acronym: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  clinicName: string;
}
