import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders
} from '../controllers/orderController.js'

const router = express.Router()

router.route('/').get(protect, admin, getAllOrders).post(protect, createOrder)
router.get('/my-orders', protect, getMyOrders)
router.get('/:id', protect, getOrderById)
router.patch('/:id/pay', protect, updateOrderToPaid)
router.patch('/:id/deliver', protect, admin, updateOrderToDelivered)

export default router
