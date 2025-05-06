import Image from 'next/image'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/hooks/useCart'

interface CartItemProps {
  item: {
    _id: string
    title: string
    price: number
    images: string[]
    quantity: number
  }
}

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart()

  return (
    <div className="flex items-center py-5 border-b border-gray-200">
      <div className="flex-shrink-0 w-24 h-24 relative">
        <Image
          src={item.images[0]}
          alt={item.title}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.title}</h3>
            <p className="ml-4">${item.price.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex items-center">
            <label htmlFor={`quantity-${item._id}`} className="mr-2 text-gray-500">
              Qty
            </label>
            <select
              id={`quantity-${item._id}`}
              value={item.quantity}
              onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
              className="rounded-md border-gray-300 py-1.5 text-base leading-5 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => removeFromCart(item._id)}
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
} 