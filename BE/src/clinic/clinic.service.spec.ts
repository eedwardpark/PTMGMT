import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { Clinic } from './entity/clinic.entity';
import { CreateClinicDto } from './dto/create-clinic.dto';

describe('ClinicService', () => {
  let service: ClinicService;
  let repository: Repository<Clinic>;

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClinicService,
        {
          provide: getRepositoryToken(Clinic),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClinicService>(ClinicService);
    repository = module.get<Repository<Clinic>>(getRepositoryToken(Clinic));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new clinic', async () => {
      const createDto: CreateClinicDto = {
        acronym: 'NYC',
        clinicName: 'New York Clinic',
      };

      const savedClinic = { id: 1, acronym: 'NYC', clinicName: 'New York Clinic' };

      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(savedClinic);
      mockRepository.save.mockResolvedValue(savedClinic);

      const result = await service.create(createDto);

      expect(result).toEqual(savedClinic);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { acronym: 'NYC' } });
      expect(mockRepository.create).toHaveBeenCalledWith({ acronym: 'NYC', clinicName: 'New York Clinic' });
      expect(mockRepository.save).toHaveBeenCalledWith(savedClinic);
    });

    it('should throw error if clinic already exists', async () => {
      const createDto: CreateClinicDto = {
        acronym: 'NYC',
        clinicName: 'New York Clinic',
      };

      mockRepository.findOne.mockResolvedValue({ id: 1, acronym: 'NYC' });

      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
    });
  });
});