export const addDecimals = num => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = state => {
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
  const totalPrice = itemsPrice + shippingPrice + taxPrice
  state.totalPrice = addDecimals(totalPrice)

  // Save to Local Storage
  localStorage.setItem('cart', JSON.stringify(state))

  return state
}
