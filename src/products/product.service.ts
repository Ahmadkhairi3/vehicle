import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {CreateVehicleResponse, CreateVehicleInput, UpdateVehicleInput} from './product.dto'
import {db2api} from './product.data.prettyfier'
import {VehicleTypesEnum} from './product.enum'
import { Vehicle} from './products.model';
import { CreateVehicleResponseMock} from './product.mocks'


@Injectable()
export class VehicleService {
  constructor(
    @InjectModel('Vehicle') private readonly vehicleModel: Model<Vehicle>,
  ) {}


  async createVehicle(
    createVehicleInput: CreateVehicleInput,
    userId: string,
  ): Promise<CreateVehicleResponse> {
    if (!userId) {
      userId = createVehicleInput.id;
    }

    const existingVehicle = await this.vehicleModel
      .findOne({vehicleNo: createVehicleInput.vehicleNo, userId})
      .exec();

    if (existingVehicle) {
      return db2api(existingVehicle);
    }


    // Create vehicle

      const vehicle = {
      vehicleNo: createVehicleInput.vehicleNo,
      userId,
      vehicleModel: createVehicleInput.vehicleModel ? createVehicleInput.vehicleModel : '',
      vehicleMake: createVehicleInput.vehicleMake ? createVehicleInput.vehicleMake : '',
      vehicleColor: createVehicleInput.vehicleColor ? createVehicleInput.vehicleColor : '',
      vehicleType: createVehicleInput.vehicleType ? createVehicleInput.vehicleType : VehicleTypesEnum.sedan,
    };

    const card = await this.vehicleModel.create(vehicle);

    return db2api(card);
  }

  async insertVehicle (
    createVehicleInput : CreateVehicleInput,
    vehicleNo: string, 
    vehicleModel: string,
    vehicleMake: string,
    vehicleColor: string,
    vehicleType: string){
    const newVehicle = new this.vehicleModel({
      createVehicleInput,
      vehicleNo,
      vehicleModel,
      vehicleMake,
      vehicleColor,
      vehicleType
    } ) ;
    const result = await newVehicle.save() ;
    return result.id as string;
  }

  async getVehicle(vehicleId: string)  {
    const vehicles = await this.vehicleModel.find().exec();
    return vehicles.map(vehicle => ({
      id: vehicle.id,
      no: vehicle.no,
      model: vehicle.model,
      make: vehicle.make,
      color: vehicle.color,
      type: vehicle.type,
    }));
  }

  async getSingleVehicle(vehicleId: string): Promise<CreateVehicleResponse> {
    const vehicle = await this.findVehicle(vehicleId);
    return {
      id: vehicle.id,
      vehicleNo: vehicle.vehicleNo,
      vehicleModel: vehicle.vehicleModel,
      vehicleMake: vehicle.vehicleMake,
      vehicleColor: vehicle.vehicleColor,
      vehicleType: vehicle.vehicleType,
    };
  }

  async getMockedSingleVehicle(MockedId: string): Promise<CreateVehicleResponse> {
    const vehicle = await this.findVehicle(MockedId);
    return {
      id: vehicle.id,
      vehicleNo: vehicle.vehicleNo,
      vehicleModel: vehicle.vehicleModel,
      vehicleColor: vehicle.vehicleColor,
      vehicleType: vehicle.vehicleType,
    };
  }

  async deleteVehicle(userId: string) {
    const result = await this.vehicleModel.deleteOne({_id: userId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find vehicle.');
    }
  }

  private async findVehicle(id: string): Promise<Vehicle> {
    let vehicle;
    try {
      vehicle = await this.vehicleModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find vehicle.');
    }
    if (!vehicle) {
      throw new NotFoundException('Could not find vehicle.');
    }
    return vehicle;
  }


  async updateVehicle(
    
    userId: string,
    data: UpdateVehicleInput,
  ): Promise<CreateVehicleResponse> {
    const vehicle = await this.vehicleModel.findOne({_id : userId});
    console.log(vehicle)
    if (vehicle) {

      vehicle.vehicleNo = data.vehicleNo ? data.vehicleNo : vehicle.vehicleNo;
      vehicle.vehicleColor = data.vehicleColor ? data.vehicleColor : vehicle.vehicleColor;
      vehicle.vehicleMake = data.vehicleMake ? data.vehicleMake : vehicle.vehicleMake;
      vehicle.vehicleModel = data.vehicleModel ? data.vehicleModel : vehicle.vehicleModel;
      vehicle.vehicleType = data.vehicleType ? data.vehicleType : vehicle.vehicleType;

      vehicle.save();

      return db2api(vehicle);
    }else {
      throw new NotFoundException(`Vehicle number ${userId} does not exist`)
  
  }

 
}
}