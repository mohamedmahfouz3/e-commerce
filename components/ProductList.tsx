'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'

interface Product {
  _id: string
  name: string
  price: number
  image: string
  description: string
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const addToCart = useCartStore((state) => state.addToCart)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <Link href={`/product/${product._id}`}>
            <div className="relative h-48 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </Link>
          <div className="p-4">
            <Link href={`/product/${product._id}`}>
              <h2 className="text-xl font-semibold mb-2 hover:text-gray-600">
                {product.name}
              </h2>
            </Link>
            <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">${product.price}</span>
              <button
                onClick={() => addToCart({ ...product, quantity: 1 })}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 