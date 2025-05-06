import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/hooks/useCart'
import type { FC } from 'react'

interface Product {
  _id: string
  title: string
  price: number
  description: string
  content: string
  category: string
  images: string[]
}

interface ProductDetailProps {
  product: Product
}

const ProductDetail: FC<ProductDetailProps> = ({ product }: ProductDetailProps) => {
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const { addToCart } = useCart()

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-6">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-offset-4 ${
                      selectedImage === index
                        ? 'ring-2 ring-primary-500'
                        : 'ring-1 ring-transparent'
                    }`}
                  >
                    <span className="sr-only">{product.title}</span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <Image
                        src={image}
                        alt={product.title}
                        fill
                        className="h-full w-full object-cover object-center"
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="aspect-h-1 aspect-w-1 w-full">
              <div className="relative h-96 w-full overflow-hidden rounded-lg">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  fill
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${product.price}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-gray-700">
                <p>{product.description}</p>
                <p>{product.content}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mt-10 flex">
                <button
                  type="button"
                  onClick={() => addToCart(Product)}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-8 py-3 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 