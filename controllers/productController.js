import Product from "../models/productModel.js";




// Create Product


export async function createProduct(req, res) {
    try {
        const newProductData = req.body;
    
        if (!newProductData.productName || !newProductData.price || !newProductData.quantity ) {
        return res.status(400).json({ message: "All fields are required" });
         }
        
        const product = new Product(newProductData);
        await product.save();

        res.status(201).json({ message: "Product Create successful" });
    } catch (err) {
        console.error("Error in product Creation:", err);
        res.status(500).json({ 
            message: "An error occurred during Creation", 
            error: err.message 
        });
    }
}