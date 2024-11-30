import mongoose, { Model } from "mongoose";

// Define the structure of an Order document using TypeScript
export type TOrder = {
    email: string; // Email of the customer placing the order
    product: mongoose.Types.ObjectId; // MongoDB ObjectId referencing the product
    quantity: number; // Quantity of the product ordered
    totalPrice: number; // Total price of the order
    createdAt?: Date; // Optional field for when the order was created
    updatedAt?: Date; // Optional field for when the order was last updated
}

// Define custom methods for the Order model
export type OrderMethod = {
    // Method to fetch an order by its unique ID
    getOrderById(id: string): Promise<TOrder | null>;

    // Method to fetch an order by the customer's email
    getOrderByEmail(email: string): Promise<TOrder>;
}

// Extend the base Mongoose Model type with custom types and methods
export type OrderModel = Model<TOrder, Record<string, never>, OrderMethod>;
