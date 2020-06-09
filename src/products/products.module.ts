import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VehicleController } from './products.controller';
import { VehicleService } from './product.service';
import { VehicleSchema } from './products.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }]),
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}