import mongoose, { Document, Model, Schema, Types } from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    referenceLink: {
      type: String,
      required: false,
    },
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: 'Review',
      default: [],
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Product',
  }
);

export interface IProduct extends Document {
  user: Types.ObjectId;
  reviews: Types.ObjectId[];
  name: string;
  description?: string;
  referenceLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductModel: Model<IProduct> = mongoose.models['Product'] || mongoose.model('Product', ProductSchema);

export default ProductModel;
