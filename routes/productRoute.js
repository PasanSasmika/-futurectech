import express from 'express';
import { createProduct, getAllProducts, getProductById } from '../controllers/productController.js';



const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getAllProducts)
productRouter.get("/:id",getProductById)


export default productRouter;