import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js';



const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getAllProducts)
productRouter.get("/:id",getProductById)
productRouter.put("/:id",updateProduct)


export default productRouter;