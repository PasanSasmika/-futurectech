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


// Update Product

export async function updateProduct(req, res) {

    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { productId: req.params.productId },
            { $set: req.body },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error in updating product',
            error: error.message
        });
    }
}



// Delete Product

export async function deleteProduct(req, res){

    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) 
      return res.status(404).json({
       message: 'Product not found'
     });

      res.json({
      message: 'Product removed'
    });

    } catch (error) {
      res.status(500).json({
      message: 'Server error in updating product',
      error: error.message 
    });
    }
  };
