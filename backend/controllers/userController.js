import asyncHandler from '../middleware/asyncHandler.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc   Auth user and get token
// @route  POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  //   Check user exists and check password
  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(res, user._id)
    res.status(200).json({
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
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  console.log(userExists)
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10)
  })
  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
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
  if (req.user) {
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc   Update User Profile
// @route  PUT /api/users/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = req.user
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10)
    }
    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
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
