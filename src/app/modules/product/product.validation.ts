import { z } from 'zod';

// Validation schema for product data
const productValidationSchema = z.object({
    name: z.string().nonempty({ message: "Name is required." }), // Ensure name is a non-empty string
    brand: z.string().nonempty({ message: "Brand is required." }), // Ensure brand is a non-empty string
    price: z.number().min(0, { message: "Price must be a non-negative number." }), // Ensure price is a non-negative number
    category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], { message: "Invalid category." }), // Ensure category is one of the specified values
    description: z.string().nonempty({ message: "Description is required." }), // Ensure description is a non-empty string
    quantity: z.number().min(0, { message: "Quantity must be a non-negative number." }), // Ensure quantity is a non-negative number
    inStock: z.boolean().optional().default(true), // Optional field with a default value of `true`
});

export default productValidationSchema;
