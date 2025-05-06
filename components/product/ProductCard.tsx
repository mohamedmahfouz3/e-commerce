import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/hooks/useCart'

interface Product {
  _id: string
  title: string
  price: number
  description: string
  content: string
  category: string
  images: string[]
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/product/${product._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="relative flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-8 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <ShoppingCartIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          Add to Cart
        </button>
      </div>
    </div>
  )
} 