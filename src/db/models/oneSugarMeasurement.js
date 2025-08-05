import { model, Schema } from 'mongoose';

const oneSugarMeasurement = new Schema(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    sugarLevel: { type: Number, required: true },
    measurementTime: {
      type: String,
      enum: ['натощак', 'после еды'],
      required: true,
      default: 'натощак',
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true, versionKey: false },
);

export const OneSugarMeasurementCollection = model(
  'measurements',
  oneSugarMeasurement,
);
