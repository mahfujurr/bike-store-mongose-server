import { Schema, model } from 'mongoose';
import { TOrder, OrderMethod, OrderModel } from './order/order.interface';

// Define the order schema
const orderSchema = new Schema<TOrder, OrderModel, OrderMethod>(
    {
        email: { type: String, required: true }, // Customer email, required field
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Reference to Product model
        quantity: { type: Number, required: true }, // Quantity of the product ordered
        totalPrice: { type: Number, required: true }, // Total price for the order
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Optionally, add indexes to optimize queries
orderSchema.index({ email: 1 });
orderSchema.index({ product: 1 });

// Create and export the Order model
const Order = model<TOrder, OrderModel>('Order', orderSchema);

export default Order;
