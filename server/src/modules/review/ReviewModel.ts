import mongoose, { Document, Model, Schema, Types } from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    comment: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      min: [0, 'Cannot give a rating below 0 points'],
      max: [10, 'Rating cannot surpass 10 points'],
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Review',
  }
);

export interface IReview extends Document {
  user: Types.ObjectId;
  product: Types.ObjectId;
  comment?: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewModel: Model<IReview> = mongoose.models['Review'] || mongoose.model('Review', ReviewSchema);

export default ReviewModel;
