import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,

  } from '@nestjs/common';
  import {UpdateVehicleInput, CreateVehicleInput,CreateVehicleResponse} from './product.dto'
  import { VehicleService} from './product.service';



  @Controller('vehicle')
  export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}
  
  

    @Post()
    async addVehicle(
      @Body() createVehicleInput: CreateVehicleInput,
      @Body('vehicleNo') vehicleNo,
      @Body('vehicleModel') vehicleModel,
      @Body('vehicleMake') vehicleMake,
      @Body('vehicleColor') vehicleColor,
      @Body ('vehicleType') vehicleType,
      
    )  {
      const generatedId = await this.vehicleService.insertVehicle(
        createVehicleInput,
        vehicleNo,
        vehicleModel,
        vehicleMake,
        vehicleColor,
        vehicleType
      );
      return { id : generatedId  };
    }
  
    @Get(':id')
    async getAllVehicle(@Param('id') vehicleId: string) {
      const vehicle = await this.vehicleService.getVehicle(vehicleId);
      return vehicle;
    }
  
    @Get(':id')
    getVehicle(@Param('id') userId: string) {
      return this.vehicleService.getSingleVehicle(userId);
    }
   
  
    @Patch(':id')
    async updateVehicle(
      @Param('id') userId: string,
      @Body() updateVehicleInput: UpdateVehicleInput,
      
     
    ): Promise<CreateVehicleResponse> {
      return this.vehicleService.updateVehicle( userId, updateVehicleInput);
    }
  
    @Delete(':id')
    async removeVehicle(@Param('id') userId: string) {
        await this.vehicleService.deleteVehicle(userId);
        return null;
    }
  }