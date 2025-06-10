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


// Get All Products


export async function getAllProducts(req, res) {

    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching products',
            error: error.message
        });
    }
}


// Get Product By Id

export async function getProductById(req,res) {

    try {
        const productId = req.params.productId

        const product = await Product.findOne({productId : productId})

        res.json(product)

    } catch (error) {
        res.status(500).json({
             success: false,
            message: 'Server error while fetching product',
            error: error.message
        })
    }
    
}