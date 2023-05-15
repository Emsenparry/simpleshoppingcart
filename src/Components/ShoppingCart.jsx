import React from 'react'
import useShoppingCart from '../Hooks/useShoppingCart'

const ShoppingCart = () => {
    const { shoppingCart } = useShoppingCart()
    console.log(shoppingCart);


  return (
    <div>ShoppingCart</div>
  )
}

export default ShoppingCart