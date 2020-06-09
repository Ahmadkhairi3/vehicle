import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Vehicle } from './products.model';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel('Vehicle') private readonly vehicleModel: Model<Vehicle>,
  ) {}

  async insertVehicle(vehicleNo: string, vehicleModel: string,vehicleMake: string,vehicleColor: string,vehicleType: string) {
    const newVehicle = new this.vehicleModel({
      vehicleNo,
      vehicleModel,
      vehicleMake,
      vehicleColor,
      vehicleType
    });
    const result = await newVehicle.save();
    return result.id as string;
  }

  async getVehicle() {
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

  async getSingleVehicle(vehicleId: string) {
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

  async updateVehicle(
    vehicleId: string,
    no: string,
    model: string,
    make: string,
    color:string,
    type:string
  ) {
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
}