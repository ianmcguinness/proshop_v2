import Product from '../models/productModel.js'
import asyncHandler from '../middleware/asyncHandler.js'

// @desc   Fetch All Products
// @route  GET /api/products
// @access Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc   Fetch Single Product by ID
// @route  GET /api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Resource not Found')
  }
})
