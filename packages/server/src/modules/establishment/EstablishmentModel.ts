import { GraphQLString } from 'graphql';
import mongoose, { Document, Model, Schema, Types } from 'mongoose';

const EstablishmentSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    referenceLink: {
      type: String,
      required: false,
    },
    category: {
      type: GraphQLString,
      enum: [
        'restaurants/cooking',
        'events',
        'hospitality',
        'shopping',
        'varieties',
        'not-specified',
      ],
      default: 'not-specified',
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
    collection: 'Establishment',
  },
);

export interface IEstablishment extends Document {
  user: Types.ObjectId;
  reviews: Types.ObjectId[];
  name: string;
  description?: string;
  address: string;
  category: string;
  referenceLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EstablishmentModel: Model<IEstablishment> =
  mongoose.models['Establishment'] ||
  mongoose.model('Establishment', EstablishmentSchema);

export default EstablishmentModel;
