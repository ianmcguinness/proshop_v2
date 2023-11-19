import Order from '../models/orderModel.js'
import asyncHandler from '../middleware/asyncHandler.js'

// @desc   Create New Order
// @route  POST /api/orders
// @access Private
export const createOrder = asyncHandler(async (req, res) => {
  res.send('Create Order')
})

// @desc   Get Logged in User's orders
// @route  GET /api/orders/my-orders
// @access Private
export const getMyOrders = asyncHandler(async (req, res) => {
  res.send('Get My Orders')
})

// @desc   Get Order by ID
// @route  GET /api/orders/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  res.send('Get Order by ID')
})

// @desc   Update Order to Paid
// @route  PATCH /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('Update Order to Paid')
})

// @desc   Update Order to Delivered
// @route  PATCH /api/orders/:id/delivered
// @access Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('Update Order to Delivered')
})

// @desc   Get All Orders
// @route  GET /api/orders
// @access Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  res.send('Get All Orders')
})
