import Order from '../models/orderModel.js'
import asyncHandler from '../middleware/asyncHandler.js'

// @desc   Create New Order
// @route  POST /api/orders
// @access Private
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order Items')
  } else {
    const order = await Order.create({
      orderItems: orderItems.map(item => ({
        ...item,
        product: item._id,
        _id: undefined
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id
    })
    res.status(201).json(order)
  }
})

// @desc   Get Logged in User's orders
// @route  GET /api/orders/my-orders
// @access Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.status(200).json(orders)
})

// @desc   Get Order by ID
// @route  GET /api/orders/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (order) {
    res.status(200).json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
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
