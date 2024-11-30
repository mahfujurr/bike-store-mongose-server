/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import mongoose from "mongoose";
import { orderService } from "./order.service";
import orderValidationSchema from "./order.validation";

// Controller function to handle order creation
const createOrder = async (req: Request, res: Response) => {
    try {
        // Validate the incoming request body using the Zod validation schema
        const validatedData = orderValidationSchema.parse(req.body);

        // Convert the product ID (string) from the request to a MongoDB ObjectId
        const productObjectId = new mongoose.Types.ObjectId(validatedData.product);

        // Pass the validated and transformed data to the service layer
        const order = await orderService.createOrderIntoDB({
            ...validatedData,
            product: productObjectId, // Replace product ID string with ObjectId
        });

        // Respond with a success message and the created order data
        res.status(201).json({
            message: "Order created successfully",
            status: true,
            data: order,
        });
    } catch (err: any) {
        // Handle validation or other errors and send a response
        res.status(400).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
};

// Controller function to calculate total revenue
const calculateRevenue = async (req: Request, res: Response) => {
    try {
        // Call the service layer to calculate total revenue
        const totalRevenue = await orderService.calculateRevenue();

        // Respond with the calculated revenue
        res.status(200).json({
            message: "Revenue calculated successfully",
            status: true,
            data: { totalRevenue },
        });
    } catch (error: any) {
        // Handle any errors and send a server error response
        res.status(500).json({
            message: error.message || "Something went wrong",
            status: false,
        });
    }
};

// Export the controller with all defined functions
const OrderController = { createOrder, calculateRevenue };
export default OrderController;
