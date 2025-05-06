import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface CartItem {
  _id: string
  title: string
  price: number
  description: string
  content: string
  category: string
  images: string[]
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

export function useCart() {
  const [state, setState] = useState<CartState>({
    items: [],
    total: 0,
  })

  useEffect(() => {
    const cart = localStorage.getItem('cart')
    if (cart) {
      const parsedCart = JSON.parse(cart)
      setState({
        items: parsedCart,
        total: parsedCart.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0),
      })
    }
  }, [])

  const addToCart = (product: CartItem) => {
    const cart = [...state.items]
    const index = cart.findIndex((item) => item._id === product._id)

    if (index === -1) {
      cart.push({ ...product, quantity: 1 })
    } else {
      cart[index].quantity += 1
    }

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    setState({ items: cart, total })
    localStorage.setItem('cart', JSON.stringify(cart))
    toast.success('Added to cart!')
  }

  const removeFromCart = (productId: string) => {
    const cart = state.items.filter((item) => item._id !== productId)
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    setState({ items: cart, total })
    localStorage.setItem('cart', JSON.stringify(cart))
    toast.success('Removed from cart!')
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return

    const cart = state.items.map((item) =>
      item._id === productId ? { ...item, quantity } : item
    )
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    setState({ items: cart, total })
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const clearCart = () => {
    setState({ items: [], total: 0 })
    localStorage.removeItem('cart')
    toast.success('Cart cleared!')
  }

  return {
    items: state.items,
    total: state.total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
} 