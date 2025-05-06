import { useState } from 'react'
import { useRouter } from 'next/router'
import { FunnelIcon } from '@heroicons/react/24/outline'

interface FilterProps {
  categories: Array<{
    _id: string
    name: string
  }>
}

export default function Filter({ categories }: FilterProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleFilter = (category: string) => {
    const currentQuery = { ...router.query }
    if (category === 'all') {
      delete currentQuery.category
    } else {
      currentQuery.category = category
    }
    router.push({
      pathname: router.pathname,
      query: currentQuery,
    })
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <FunnelIcon className="h-5 w-5 mr-2" aria-hidden="true" />
        Filter
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => handleFilter('all')}
              className={`block w-full text-left px-4 py-2 text-sm ${
                !router.query.category
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              role="menuitem"
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleFilter(category._id)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  router.query.category === category._id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                role="menuitem"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 