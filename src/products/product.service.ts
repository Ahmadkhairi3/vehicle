import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {CreateVehicleResponse, CreateVehicleInput, UpdateVehicleInput} from './product.dto'
import {db2api} from './product.data.prettyfier'
import {VehicleTypesEnum} from './product.enum'
import {UserId} from './user.decorators'
import { Vehicle} from './products.model';


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
      userId = createVehicleInput.userId;
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

  async getVehicle()  {
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

  async getSingleVehicle(vehicleId: string)  {
    const vehicle = await this.findVehicle(vehicleId);
    return {
      id: vehicle.id,
      no: vehicle.vehicleNo,
      model: vehicle.vehicleModel,
      make: vehicle.vehicleMake,
      color: vehicle.vehicleColor,
      type: vehicle.vehicleType,
    };
  }

 /* async updateVehicle (
    vehicleId: string,
    no: string,
    model: string,
    make: string,
    color:string,
    type:string
  )  {
    const updatedVehicle = await this.findVehicle(vehicleId);
    if (no) {
      updatedVehicle.vehicleNo = no;
    }
    if (model) {
      updatedVehicle.vehicleModel = model;
    }
    if (make) {
      updatedVehicle.vehicleMake = make;
    }
    if (color) {
      updatedVehicle.vehicleColor = color;
    }
    if (type) {
      updatedVehicle.vehicleType = type;
    }
    updatedVehicle.save();
  }
*/
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
    data: UpdateVehicleInput,
    userId: string,

  ): Promise<CreateVehicleResponse> {
    const vehicle = await this.vehicleModel.findOne({userId});


    if (vehicle) {

      vehicle.vehicleNo = data.vehicleNo;
      vehicle.vehicleColor = data.vehicleColor;
      vehicle.vehicleMake = data.vehicleMake;
      vehicle.vehicleModel = data.vehicleModel;
      vehicle.vehicleType = data.vehicleType;

      vehicle.save();

      return db2api(vehicle);
    }

  }

 
  }




