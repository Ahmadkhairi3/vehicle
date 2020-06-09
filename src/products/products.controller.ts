import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  
  import { VehicleService } from './product.service';
  
  @Controller('vehicle')
  export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}
  
    @Post()
    async addVehicle(
      
      @Body('vehicleNo') vehicleNo: string,
      @Body('vehicleModel') vehicleModel: string,
      @Body('vehicleMake') vehicleMake: string,
      @Body('vehicleColor') vehicleColor: string,
      @Body('vehicleType') vehicleType: string,
    ) {
      const generatedId = await this.vehicleService.insertVehicle(
        vehicleNo,
        vehicleModel,
        vehicleMake,
        vehicleColor,
        vehicleType
      );
      return {  id: generatedId  };
    }
  
    @Get()
    async getAllVehicle() {
      const vehicle = await this.vehicleService.getVehicle();
      return vehicle;
    }
  
    @Get(':id')
    getVehicle(@Param('id') userId: string) {
      return this.vehicleService.getSingleVehicle(userId);
    }
  
    @Patch(':id')
    async updateVehicle(
      @Param('id') userId:  string,
      @Body('vehicleNo') vehicleNo: string,
      @Body('vehicleModel') vehicleModel: string,
      @Body('vehicleMake') vehicleMake: string,
      @Body('vehicleColor') vehicleColor: string,
      @Body('vehicleType') vehicleType: string,
    ) {
      await this.vehicleService.updateVehicle(userId,vehicleNo, vehicleModel, vehicleMake,vehicleColor,vehicleType);
      return null;
    }
  
    @Delete(':id')
    async removeVehicle(@Param('id') userId: string) {
        await this.vehicleService.deleteVehicle(userId);
        return null;
    }
  }