import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './products/products.module';
import {MongooseModule} from '@nestjs/mongoose'

@Module({
  imports: [VehicleModule, MongooseModule.forRoot('mongodb+srv://khairi1:Kucing99@project-gnj2f.gcp.mongodb.net/project?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

