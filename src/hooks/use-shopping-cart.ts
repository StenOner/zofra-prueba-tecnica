import { useState, useEffect } from 'react'
import { ShoppingCartItem } from '@/models'

const useShoppingCart = () => {
  const [cartItems, setCartItems] = useState<ShoppingCartItem[]>([])

  useEffect(() => {
    const storedCartItems = localStorage.getItem('shoppingCart')
    if (storedCartItems) setCartItems(JSON.parse(storedCartItems))
  }, [])

  const addToCart = (item: ShoppingCartItem) => {
    if (cartItems.some(cartItem => cartItem.productName === item.productName)) {
      const updatedCartItems = cartItems.map(cartItem => {
        if (cartItem.productName === item.productName) cartItem.quantity += item.quantity
        return cartItem
      })
      setCartItems(updatedCartItems)
      localStorage.setItem('shoppingCart', JSON.stringify(updatedCartItems))
      return
    }
    const updatedCartItems = [...cartItems, item]
    setCartItems(updatedCartItems)
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCartItems))
  }

  const subtractFromCart = (productName: string, quantity: number) => {
    if (!cartItems.some(cartItem => cartItem.productName === productName)) return

    const updatedCartItems = cartItems.map(item => {
      if (item.productName === productName) item.quantity -= quantity
      return item
    })
    if (updatedCartItems.some(item => item.quantity <= 0)) {
      removeFromCart(productName)
      return
    }
    setCartItems(updatedCartItems)
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCartItems))
  }

  const removeFromCart = (productName: string) => {
    const updatedCartItems = cartItems.filter(item => item.productName !== productName)
    setCartItems(updatedCartItems)
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCartItems))
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('shoppingCart')
  }

  return { cartItems, addToCart, subtractFromCart, removeFromCart, clearCart }
}

export default useShoppingCart