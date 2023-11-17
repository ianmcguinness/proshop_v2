import asyncHandler from '../middleware/asyncHandler.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

// @desc   Auth user and get token
// @route  POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  //   Check user exists and check password
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    })
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(401)
    throw new Error('Invalid login credentials')
  }
})

// @desc   Register new User
// @route  POST /api/users/register
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  res.send('Register User')
})

// @desc   Log user out and clear cookie
// @route  POST /api/users/logout
// @access Private
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('jwt')
  res.status(200).json({ message: 'Logged out successfully' })
})

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  res.send('Get User Profile')
})

// @desc   Update User Profile
// @route  PUT /api/users/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('Update User Profile')
})

// @desc   Get users
// @route  GET /api/users
// @access Admin
export const getUsers = asyncHandler(async (req, res) => {
  res.send('Get Users')
})

// @desc   Get user by ID
// @route  GET /api/users/:id
// @access Admin
export const getUserById = asyncHandler(async (req, res) => {
  res.send('Get User By ID')
})

// @desc   Delete User
// @route  DELETE /api/users/:id
// @access Admin
export const deleteUser = asyncHandler(async (req, res) => {
  res.send('Delete User')
})

// @desc   Update User
// @route  PUT /api/users/:id
// @access Admin
export const updateUser = asyncHandler(async (req, res) => {
  res.send('Update User')
})
