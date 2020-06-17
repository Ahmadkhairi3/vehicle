import {Test, TestingModule} from '@nestjs/testing';
import {VehicleService} from './product.service';

import {getModelToken} from '@nestjs/mongoose';
import { Module } from 'module';
import { VehicleModule } from './products.module';

describe('CardsService', () => {
  let service: VehicleService;

  const TestVehicleModel = {
    constructor(vehicleData) {
      return vehicleData;
    },
    
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndDelete: jest.fn(),
    findOneAndUpdate: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
    countDocuments: jest.fn(),
  };

  const mockProviders = [
    {
      provide: getModelToken('Vehicle'),
      useValue: TestVehicleModel,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [VehicleModule],
      providers: [...mockProviders, VehicleService],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
