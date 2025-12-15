import mongoose, { Schema, Document } from "mongoose";


export interface IProduct extends Document {
  title: string;
  price: number;
  size: number;
  type: string;
  referenceno?: number;
  image: string;
  description: string;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    referenceno: { type: Number },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
 {
    timestamps: true,
    versionKey: false, 
  }
);

const ProductModel = mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
export default ProductModel;