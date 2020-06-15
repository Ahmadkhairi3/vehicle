import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {
  IsNumberString,
  Length,
  IsEnum,
  IsOptional,
  IsBoolean,
  Matches,
  IsString,
  IsDateString,
} from 'class-validator';
import {VehicleTypesEnum} from './product.enum';

export class CreateVehicleInput {
  
  @ApiProperty({
    type: 'string',
    description: 'vehicle car plate number',
    example: 'ABC1234',
  })
  vehicleNo?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: 'string',
    description: 'vehicle fleet userId',
  })
  userId?: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    description: 'Vehicle model',
    example: 'Proton',
  })
  vehicleModel?: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    description: 'Vehicle make',
    example: 'X70',
  })
  vehicleMake?: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    description: 'Vehicle color',
    example: 'red',
  })
  vehicleColor?: string;

  @IsOptional()
  @IsEnum(VehicleTypesEnum)
  @ApiPropertyOptional({
    type: 'string',
    description: 'Vehicle type',
    example: 'sedan',
    enum: VehicleTypesEnum,
  })
  vehicleType?: VehicleTypesEnum;
  static id: string;
}

export class UpdateVehicleInput {

  @ApiProperty({
    type: 'string',
    description: 'vehicle car plate number',
    example: 'ABC1234',
  })
  vehicleNo?: string;


  @ApiProperty({
    type: 'string',
    description: 'Vehicle model',
    example: 'Proton',
  })
  vehicleModel?: string;


  @ApiProperty({
    type: 'string',
    description: 'Vehicle make',
    example: 'X70',
  })
  vehicleMake?: string;


  @ApiProperty({
    type: 'string',
    description: 'Vehicle color',
    example: 'red',
  })
  vehicleColor?: string;

  @ApiProperty({
    type: 'string',
    description: 'Vehicle type',
    example: 'sedan',
    enum: VehicleTypesEnum,
  })
  vehicleType?: VehicleTypesEnum;

}

export class CreateVehicleResponse {
  @ApiProperty({
    type: 'string',
    description: 'vehicle document Id',
  })
  id: string;


  @ApiProperty({
    type: 'string',
    description: 'vehicle car plate number',
  })
  vehicleNo?: string;


  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    description: 'Vehicle model',
  })
  vehicleModel: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    description: 'Vehicle color',
  })
  vehicleColor: string;

  @ApiProperty({
    type: 'string',
    description: 'Vehicle make',
    example: 'X70',
  })
  vehicleMake?: string;


  @IsEnum(VehicleTypesEnum)
  @ApiPropertyOptional({
    type: 'string',
    description: 'Vehicle type',
  })
  vehicleType: string;

}
