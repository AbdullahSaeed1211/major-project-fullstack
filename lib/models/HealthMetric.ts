import mongoose, { Schema, Document } from 'mongoose';

export interface IHealthMetric extends Document {
  userId: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const HealthMetricSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['normal', 'warning', 'critical'],
      default: 'normal',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries by user and date
HealthMetricSchema.index({ userId: 1, date: -1 });

export const HealthMetric = mongoose.models.HealthMetric || 
  mongoose.model<IHealthMetric>('HealthMetric', HealthMetricSchema); 