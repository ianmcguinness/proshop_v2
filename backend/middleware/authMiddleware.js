import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (err) {
      res.status(401)
      throw new Error('Not Authorised. Token Invalid')
    }
  } else {
    res.status(401)
    throw new Error('Not Authorised. No Token')
  }
})

// Admin Middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not Authorised as Admin')
  }
}
