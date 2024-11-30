/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import Product from "../product.model";
import { TProduct } from "./product.interface";

// Function to create a new product and save it in the database
const createProductIntoDB = async (productData: TProduct) => {
    const product = new Product(productData);  // Create a new product instance
    const result = await product.save();      // Save the product in the database
    return result;                            // Return the saved product
}

// Function to get all products from the database, with optional search functionality
const getAllProductsFromDB = async (searchTerm?: string) => {
    const query: any = {};  // Initialize an empty query object

    if (searchTerm) {
        // If search term is provided, filter products by name, brand, or category (case-insensitive)
        query.$or = [
            { name: { $regex: searchTerm, $options: "i" } }, // Search by name
            { brand: { $regex: searchTerm, $options: "i" } }, // Search by brand
            { category: { $regex: searchTerm, $options: "i" } }, // Search by category
        ];
    }

    const result = await Product.find(query);  // Query the database with the constructed query
    return result;                             // Return the found products
}

// Function to get a single product from the database by its ID
const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findById(id);  // Find the product by its ID
    return result;                              // Return the product
}

// Function to update a product in the database by its ID
const UpdateProductFromDB = async (id: string, updateData: Partial<TProduct>) => {
    // Validate the provided `id`
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid product ID format."); // Throw an error if the ID is not valid
    }

    // Perform the update and return the updated product document
    const result = await Product.findByIdAndUpdate(
        id,  // Match the product by its ID
        { $set: { ...updateData } },  // Update the fields with the provided data
        { new: true, runValidators: true }  // Return the updated document and apply schema validations
    );

    if (!result) {
        throw new Error("Product not found"); // Throw an error if the product was not found
    }

    return result;  // Return the updated product
};

// Function to delete a product from the database by its ID
const DeleteProductFromDB = async (id: string) => {
    const result = await Product.findByIdAndDelete(id);  // Find and delete the product by its ID
    return result;  // Return the result of the deletion
}

export const productService = {
    DeleteProductFromDB,       // Export the delete function
    createProductIntoDB,       // Export the create function
    getAllProductsFromDB,      // Export the function to get all products
    getSingleProductFromDB,    // Export the function to get a single product
    UpdateProductFromDB        // Export the update function
}
