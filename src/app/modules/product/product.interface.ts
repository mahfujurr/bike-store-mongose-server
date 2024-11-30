import { Model } from "mongoose";

// Define the structure of a Product document
export type TProduct = {
    name: string;                        // Name of the product
    brand: string;                       // Brand of the product
    price: number;                       // Price of the product
    category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric'; 
                                          // Enum for product categories
    description: string;                 // Description of the product
    quantity: number;                    // Quantity available
    inStock: boolean;                    // Stock availability flag
    createdAt?: Date;                    // Timestamp for creation (optional)
    updatedAt?: Date;                    // Timestamp for last update (optional)
}

// Define methods associated with the Product model
export type ProductMethod = {
    getProductById(id: string): Promise<TProduct | null>; 
                                          // Method to fetch a product by its ID
    getProductByEmail(email: string): Promise<TProduct>; 
                                          // Method to fetch a product by an associated email
}

// Define the Product model type, combining the document structure (TProduct) with the custom methods (ProductMethod)
export type ProductModel = Model<TProduct, Record<string, never>, ProductMethod>;
