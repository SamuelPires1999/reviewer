import { GraphQLString } from 'graphql';
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
    category: {
      type: GraphQLString,
      enum: ['food', 'games', 'pc-parts', 'clothing', 'gadgets', 'random'],
      required: true,
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
  category: string;
  referenceLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductModel: Model<IProduct> = mongoose.models['Product'] || mongoose.model('Product', ProductSchema);

export default ProductModel;
