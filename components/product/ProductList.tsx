import { useState } from 'react'
import ProductCard from './ProductCard'
import Filter from '../Filter'

interface Product {
  _id: string
  title: string
  price: number
  description: string
  content: string
  category: string
  images: string[]
}

interface Category {
  _id: string
  name: string
}

interface ProductListProps {
  products: Product[]
  categories: Category[]
}

export default function ProductList({ products, categories }: ProductListProps) {
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name')

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'name':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
          <div className="flex items-center space-x-4">
            <Filter categories={categories} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            >
              <option value="name">Sort by name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
} 