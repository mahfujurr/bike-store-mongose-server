import { z } from "zod";

// Define a custom validation schema for MongoDB ObjectId strings
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, { 
  message: "Invalid product ID format." // Error message for invalid ObjectId format
});

// Define the validation schema for order data
const orderValidationSchema = z.object({
  // Validate email as a properly formatted string
  email: z.string().email({ message: "Invalid email format." }),

  // Validate product as a MongoDB ObjectId string
  product: objectId,

  // Validate quantity as a positive integer
  quantity: z.number().int().positive({ message: "Quantity must be a positive integer." }),

  // Validate totalPrice as a positive number
  totalPrice: z.number().positive({ message: "Total price must be a positive number." }),
});

export default orderValidationSchema;
