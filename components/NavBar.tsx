import { Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Computers', href: '/?search=all&page=2&category=62f1eac2d3dc8723940b99fd' },
  { name: 'Women Fashion', href: '/?search=all&page=2&category=62f2f5bacec58848b0cb8d06' },
  { name: 'Men Fashion', href: '/?search=all&page=2&category=62f2f5b1cec58848b0cb8d05' },
  { name: 'Sports', href: '/?category=62f2f698cec58848b0cb8d0e' },
  { name: 'Contact', href: '#contact-footer' },
]

export default function NavBar() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { items } = useCart()

  const isActive = (path: string) => router.pathname === path

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/lgo2.svg" alt="Logo" />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive(item.href)
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <Link
              href="/cart"
              className="p-2 text-gray-400 hover:text-gray-500 relative"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {user ? (
              <Menu as="div" className="ml-3 relative">
                <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    {user.role === 'admin' && (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/users"
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Users
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/create"
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Products
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/categories"
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Categories
                            </Link>
                          )}
                        </Menu.Item>
                      </>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link
                href="/signin"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                <UserIcon className="h-5 w-5 mr-2" />
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 