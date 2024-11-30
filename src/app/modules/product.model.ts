
import { Schema, model } from 'mongoose';
import { TProduct, ProductMethod, ProductModel } from './product/product.interface';


const productSchema = new Schema<TProduct, ProductModel, ProductMethod>(
    {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        category: {
            type: String,
            required: true,
            enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        },
        description: { type: String, required: true },
        quantity: { type: Number, required: true, min: 0 },
        inStock: { type: Boolean, default: true },
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const Product = model<TProduct, ProductModel>('Product', productSchema);

export default Product;