import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

const app = express()
dotenv.config()
connectDB()

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(p => p._id === id)
  res.json(product)
})

const port = process.env.PORT || 5000
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
)
