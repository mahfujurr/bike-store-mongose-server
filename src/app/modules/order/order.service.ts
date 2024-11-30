import Order from "../order.model";
import Product from "../product.model";
import { TOrder } from "./order.interface";

// Service function to create an order and save it into the database
const createOrderIntoDB = async (orderData: TOrder) => {
    // Fetch the product details from the database using the provided product ID
    const product = await Product.findById(orderData.product);

    // Throw an error if the product is not found
    if (!product) {
        throw new Error("Product not found.");
    }

    // Check if the product stock is sufficient for the requested order quantity
    if (product.quantity < orderData.quantity) {
        throw new Error("Insufficient stock available.");
    }

    // Deduct the ordered quantity from the product's stock
    product.quantity -= orderData.quantity;

    // Update the inStock status if the product's quantity reaches zero
    if (product.quantity === 0) {
        product.inStock = false;
    }

    // Save the updated product information in the database
    await product.save();

    // Create a new order with the provided order data and save it to the database
    const order = new Order(orderData);
    return await order.save();
};

// Service function to calculate the total revenue from all orders
const calculateRevenue = async (): Promise<number> => {
    // Use MongoDB aggregation to sum up the total revenue from all orders
    const result = await Order.aggregate([
        {
            $group: {
                _id: null, // Group all documents (no specific grouping criteria)
                totalRevenue: { $sum: { $multiply: ["$totalPrice", 1] } }, // Calculate total revenue
            },
        },
    ]);

    // Return the total revenue if available; otherwise, return 0
    return result.length > 0 ? result[0].totalRevenue : 0;
};

// Export the order service object containing all service methods
export const orderService = {
    createOrderIntoDB: createOrderIntoDB,
    calculateRevenue: calculateRevenue,
};
