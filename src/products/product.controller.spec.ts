import {Test} from '@nestjs/testing';
import {VehicleController} from './products.controller';
import {VehicleService} from './product.service';
import {CreateVehicleInput, CreateVehicleResponse, UpdateVehicleInput} from './product.dto';
import {VehicleTypesEnum} from './product.enum';
import {CreateVehicleResponseMock} from './product.mocks';

describe('Cards Controller', () => {
  let controller: VehicleController;
  const mockedVehicleService = {
    createVehicle: jest.fn(),
    getVehicleByUserId: jest.fn(),
    getVehicle: jest.fn(),
    updateVehicle: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: VehicleService,
          useValue: mockedVehicleService,
        },
      ],
      controllers: [VehicleController],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createVehicle', () => {
    it('should create vehicle', async () => {
      // Prepare
      const mockedInput: CreateVehicleInput = {
        vehicleNo: 'some-number',
        vehicleModel: 'some-model',
        vehicleColor: 'some-color',
        vehicleMake: 'some-make',
        vehicleType: VehicleTypesEnum.hacthback,
      };

      const mockedId = 'some-user';
      mockedVehicleService.createVehicle.mockResolvedValue(CreateVehicleResponseMock);
      
      // Action
     
        const result : CreateVehicleResponse = await mockedVehicleService.createVehicle(
        mockedInput,
        mockedInput.vehicleColor,
        mockedInput.vehicleModel,
        mockedInput.vehicleNo,
        mockedInput.vehicleMake,
       mockedInput.vehicleType
      );

      // Assert
      expect(result.vehicleColor).toBe(CreateVehicleResponseMock.vehicleColor);
      expect(result.vehicleModel).toBe(CreateVehicleResponseMock.vehicleModel);
      expect(result.vehicleNo).toBe(CreateVehicleResponseMock.vehicleNo);
      expect(result.vehicleType).toBe(CreateVehicleResponseMock.vehicleType);
      expect(result.id).toBeDefined();
    });
  });

  describe('getUserVehicle', () => {
    it('should return users vehicle', async () => {
      // Prepare
      const mockedUserId = 'some-user';
      mockedVehicleService.getVehicleByUserId.mockResolvedValue([CreateVehicleResponseMock]);

      // Action
      const result : CreateVehicleResponse = await mockedVehicleService.getVehicleByUserId(mockedUserId);

      // Assert
     // expect(result.length).toBe(1);
      expect(result[0].vehicleColor).toBe(CreateVehicleResponseMock.vehicleColor);
      expect(result[0].vehicleModel).toBe(CreateVehicleResponseMock.vehicleModel);
      expect(result[0].vehicleNo).toBe(CreateVehicleResponseMock.vehicleNo);
      expect(result[0].vehicleType).toBe(CreateVehicleResponseMock.vehicleType);
      expect(result[0].id).toBeDefined();
    });
  });

  describe('getUserVehicleByVehicleNumber', () => {
    it('should return vehicle by vehicle number', async () => {
      // Prepare
      const mockedVehicleNumber = 'some-vehicle-number';
      const mockedUserId = 'some-user';

      mockedVehicleService.getVehicle.mockResolvedValue([CreateVehicleResponseMock]);

      // Action
      const result: CreateVehicleResponse[] = await controller.getAllVehicle(mockedUserId);

      // Assert
      expect(result.length).toBe(1);
      expect(result[0].vehicleColor).toBe(CreateVehicleResponseMock.vehicleColor);
      expect(result[0].vehicleModel).toBe(CreateVehicleResponseMock.vehicleModel);
      expect(result[0].vehicleNo).toBe(CreateVehicleResponseMock.vehicleNo);
      expect(result[0].vehicleType).toBe(CreateVehicleResponseMock.vehicleType);
      expect(result[0].id).toBeDefined();
    });
  });

  describe('updateVehicle', () => {
    it('should update user vehicle', async () => {
      // Prepare
      const mockedInput: UpdateVehicleInput = {
        vehicleNo: 'some-number',
        vehicleModel: 'some-model',
        vehicleColor: 'some-color',
        vehicleMake: 'some-make',
        vehicleType: VehicleTypesEnum.hacthback,
      };
      const mockedUserId = 'some-user';
      mockedVehicleService.updateVehicle.mockResolvedValue(CreateVehicleResponseMock);
      // Action
      const result: CreateVehicleResponse = await controller.updateVehicle(
        mockedUserId,
        mockedInput
        
        
      );

      // Assert
      expect(result.vehicleColor).toBe(CreateVehicleResponseMock.vehicleColor);
      expect(result.vehicleModel).toBe(CreateVehicleResponseMock.vehicleModel);
      expect(result.vehicleNo).toBe(CreateVehicleResponseMock.vehicleNo);
      expect(result.vehicleType).toBe(CreateVehicleResponseMock.vehicleType);
      expect(result.id).toBeDefined();
    });
  });
});
