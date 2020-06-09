import * as mongoose from 'mongoose';

export const VehicleSchema = new mongoose.Schema({
  vehicleNo: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  vehicleMake: { type: String, required: true },
  vehicleColor: { type: String, required: true },
  vehicleType: { type: String, required: true },
});

export interface Vehicle extends mongoose.Document {
  save();
  id: string;
  vehicleNo: string;
  vehicleModel: string;
  vehicleMake: string;
  vehicleColor: string;
  vehicleType: string;
}

