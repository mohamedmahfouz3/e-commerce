import Image from 'next/image'
import { format } from 'date-fns'

interface OrderItem {
  _id: string
  title: string
  price: number
  quantity: number
  images: string[]
}

interface Order {
  _id: string
  user: {
    name: string
    email: string
  }
  address: string
  mobile: string
  cart: OrderItem[]
  total: number
  paymentId: string
  createdAt: string
  delivered: boolean
}

interface OrderDetailProps {
  order: Order
}

export default function OrderDetail({ order }: OrderDetailProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Order Details</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Order #{order._id}
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Customer</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {order.user.name} ({order.user.email})
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Shipping Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {order.address}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {order.mobile}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Order Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {format(new Date(order.createdAt), 'PPP')}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Payment ID</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {order.paymentId}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.delivered
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {order.delivered ? 'Delivered' : 'Processing'}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Order Items</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {order.cart.map((item) => (
            <li key={item._id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-16 h-16 relative">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="flex-shrink-0 text-sm font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total</p>
          <p>${order.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
} 