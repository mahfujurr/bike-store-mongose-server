import express from 'express';
import { ProductController } from './product.controller';
import OrderController from '../order/order.controller';

const router = express.Router();

// Route to create a new product
router.post('/create-product', ProductController.createProduct);

// Route to fetch all products
router.get('/', ProductController.getAllProducts);

// Route to fetch a single product by ID
router.get('/:product_id', ProductController.getSingleProduct);

// Route to update a single product by ID
router.put('/:product_id', ProductController.UpdateSingleProduct);

// Route to delete a single product by ID
router.delete('/:product_id', ProductController.deleteProduct);

// Route to create a new order
router.post("/orders", OrderController.createOrder);

export const ProductRoutes = router;
