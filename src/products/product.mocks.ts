import {CreateVehicleResponse} from './product.dto';
import {VehicleTypesEnum} from './product.enum';

export const CreateVehicleResponseMock: CreateVehicleResponse = {
  id: 'some-id',
  vehicleNo: 'some-number',
  vehicleColor: 'some-color',
  vehicleModel: 'some-model',
  vehicleType: VehicleTypesEnum.hacthback,
};
