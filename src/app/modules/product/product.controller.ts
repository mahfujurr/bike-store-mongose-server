/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { productService } from './product.service';
import productValidationSchema from './product.validation';
import { z } from 'zod';

// Custom error formatter for Zod validation errors
const formatZodErrors = (zodError: z.ZodError, rawData: Record<string, any>) => {
    const errors: Record<string, any> = {};
    zodError.errors.forEach((err) => {
        const field = err.path.join("."); // Join path segments to create a full field name
        errors[field] = {
            message: err.message,
            name: "ValidatorError",
            properties: {
                message: err.message,
                type: err.code,
            },
            kind: err.code, // Error kind, e.g., invalid_type, too_small, etc.
            path: field,
            value: rawData[field] ?? null, // Extract the raw input value for the field
        };
    });
    return errors;
};

// Controller to create a new product
const createProduct = async (req: Request, res: Response) => {
    try {
        const ProductData = req.body;

        // Validate the incoming data using Zod schema
        const validatedData = productValidationSchema.parse(ProductData);

        // Call the service to insert the validated product data into the database
        const result = await productService.createProductIntoDB(validatedData);

        res.status(201).json({
            success: true,
            message: "Bike created successfully",
            data: result,
        });
    } catch (err: any) {
        if (err instanceof z.ZodError) {
            // Handle validation errors from Zod
            return res.status(400).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: "ValidationError",
                    errors: formatZodErrors(err, req.body), // Format errors with raw input data
                },
            });
        }

        // Handle other unexpected errors
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
};

// Controller to fetch all products, with optional search functionality
const getAllProducts = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.searchTerm as string | undefined; // Extract search term from query
        const result = await productService.getAllProductsFromDB(searchTerm);

        res.status(200).json({
            success: true,
            message: "Bikes retrieved successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
};

// Controller to fetch a single product by its ID
const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { product_id } = req.params; // Extract product ID from request parameters
        const result = await productService.getSingleProductFromDB(product_id);

        res.status(200).json({
            success: true,
            message: "Bike retrieved successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
};

// Controller to update a single product by its ID
const UpdateSingleProduct = async (req: Request, res: Response) => {
    try {
        const { product_id } = req.params; // Extract product ID from request parameters
        const productData = req.body; // Extract updated product data from the request body
        const result = await productService.UpdateProductFromDB(product_id, productData);

        res.status(200).json({
            success: true,
            message: "Bike updated successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
};

// Controller to delete a product by its ID
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { product_id } = req.params; // Extract product ID from request parameters
        const result = await productService.DeleteProductFromDB(product_id);

        res.status(200).json({
            success: true,
            message: "Bike deleted successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
};

// Exporting the ProductController with all its methods
export const ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    UpdateSingleProduct,
};
