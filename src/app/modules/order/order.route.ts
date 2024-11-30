import express from "express";
import OrderController from "./order.controller";

// Create a new Express router instance
const router = express.Router();

// Define the route for creating a new order
// HTTP POST: Handles incoming requests to create an order
router.post("/", OrderController.createOrder);

// Define the route for calculating total revenue
// HTTP GET: Handles requests to retrieve the calculated revenue
router.get('/revenue', OrderController.calculateRevenue);

// Export the router to be used in the application
export const orderRoutes = router;
