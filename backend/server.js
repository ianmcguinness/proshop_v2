import express from 'express'
import products from './data/products.js'

const app = express()

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(p => p._id === id)
  res.json(product)
})

const port = 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
