import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser
} from '../controllers/userController.js'

const router = express.Router()

router.route('/').get(protect, admin, getUsers).post(registerUser)
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.post('/auth', authUser)
router.post('/logout', protect, logoutUser)

export default router
