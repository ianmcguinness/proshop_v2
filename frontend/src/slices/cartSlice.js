import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] }

const addDecimals = num => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existingItem = state.cartItems.find(i => i._id === item._id)
      if (existingItem) {
        state.cartItems = state.cartItems.map(x =>
          x._id === existingItem._id ? item : x
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }
      //   Calculate Items Price
      const itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + (item.price * 100 * item.qty) / 100,
        0
      )
      state.itemsPrice = addDecimals(itemsPrice)

      //   Calculate Shipping Price - If order >= $100 Shipping is free. Else Shipping is $10
      const shippingPrice = state.itemsPrice >= 100 ? 0 : 10
      state.shippingPrice = addDecimals(shippingPrice)

      // Calculate Tax Price - 15% Tax
      const taxPrice = state.itemsPrice * 0.15
      state.taxPrice = addDecimals(taxPrice)

      // Calculate Total Price
      const totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice
      state.totalPrice = addDecimals(totalPrice)

      // Save to Local Storage
      localStorage.setItem('cart', JSON.stringify(state))
    }
  }
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer
