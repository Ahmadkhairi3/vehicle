import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,

  } from '@nestjs/common';
  import {Vehicle} from './products.model'
  import {UpdateVehicleInput, CreateVehicleInput,CreateVehicleResponse} from './product.dto'
  import { VehicleService} from './product.service';
  import {ApiBearerAuth, ApiOperation, ApiBody , ApiResponse} from '@nestjs/swagger';
import {  } from 'querystring';
import {UserId} from './user.decorators'


  @Controller('vehicle')
  export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}
  
   /* async createVehicle(
      @Body() createVehicleInput: CreateVehicleInput,
      @Body('vehicleNo') vehicleNo,
      @Body('vehicleModel') vehicleModel,
      @Body('vehicleMake') vehicleMake,
      @Body('vehicleColor') vehicleColor,
      @Body ('vehicleType') vehicleType
    ) {
      return this.vehicleService.createVehicle(vehicleNo, vehicleModel,vehicleMake,vehicleColor,vehicleType);
    }*/
    @Post()
    async createVehicle(
      @Body() createVehicleInput: CreateVehicleInput,
      @Body('vehicleNo') vehicleNo,
      @Body('vehicleModel') vehicleModel,
      @Body('vehicleMake') vehicleMake,
      @Body('vehicleColor') vehicleColor,
      @Body ('vehicleType') vehicleType,
  
    ) {
      return this.vehicleService.insertVehicle (createVehicleInput, createVehicleInput.vehicleNo ,createVehicleInput.vehicleModel,createVehicleInput.vehicleMake,createVehicleInput.vehicleColor,createVehicleInput.vehicleType);
    }

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
      @Body() updateVehicleInput: UpdateVehicleInput,
      @Param('Id') userId: string,
     
    ): Promise<CreateVehicleResponse> {
      return this.vehicleService.updateVehicle(updateVehicleInput, userId);
    }
  
    @Delete(':id')
    async removeVehicle(@Param('id') userId: string) {
        await this.vehicleService.deleteVehicle(userId);
        return null;
    }
  }