'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useFilterBar } from './FilterBar'
import { TireProduct } from '../data/pageMock'
import { CarSelection } from '../data/navbarMock'

type FilterType = 'all' | 'popular' | 'price_low_high' | 'price_high_low'

interface ProductsProps {
  products?: TireProduct[]
  selectedCar?: CarSelection | null
  filterType?: FilterType
}

function ProductCard({ product }: { product: TireProduct }) {
  const discountAmount = product.oldPrice ? product.oldPrice - product.price : 0
  
  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-3">
        {/* Brand and Tags */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{product.brand}</h3>
          {product.tags && product.tags.length > 0 && (
            <div className="flex gap-1">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Product Name */}
        <h4 className="text-sm text-gray-700 font-medium">{product.name}</h4>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews} รีวิว)</span>
        </div>

        {/* Attributes */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {product.attributes.comfort && (
            <div className="flex justify-between">
              <span>ความสบาย</span>
              <span>{'★'.repeat(product.attributes.comfort)}</span>
            </div>
          )}
          {product.attributes.handling && (
            <div className="flex justify-between">
              <span>การควบคุม</span>
              <span>{'★'.repeat(product.attributes.handling)}</span>
            </div>
          )}
          {product.attributes.fuelEconomy && (
            <div className="flex justify-between">
              <span>ประหยัดน้ำมัน</span>
              <span>{'★'.repeat(product.attributes.fuelEconomy)}</span>
            </div>
          )}
          {product.attributes.noise && (
            <div className="flex justify-between">
              <span>เสียงเงียบ</span>
              <span>{'★'.repeat(product.attributes.noise)}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              {product.price.toLocaleString()}{product.currency}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.oldPrice.toLocaleString()}{product.currency}
              </span>
            )}
          </div>
          {product.discountPercent && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-600 font-medium">
                ประหยัด {discountAmount.toLocaleString()}{product.currency}
              </span>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                -{product.discountPercent}%
              </span>
            </div>
          )}
        </div>

        {/* Popular Badge */}
        {product.isPopular && (
          <div className="text-center">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-medium">
              🔥 ยอดนิยม
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Products({ products, selectedCar, filterType }: ProductsProps) {
  // If props are provided, use them; otherwise, use context
  const context = useFilterBar()
  const actualProducts = products || context.filteredProducts
  const actualSelectedCar = selectedCar !== undefined ? selectedCar : context.selectedCar
  const actualFilterType = filterType || context.selectedFilter

  // If no selected car, show skeleton or nothing
  if (!actualSelectedCar) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Skeleton Header */}
        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded-lg w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>

        {/* Skeleton Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="space-y-3">
                {/* Brand and Tags Skeleton */}
                <div className="flex items-center justify-between">
                  <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="flex gap-1">
                    <div className="h-5 bg-gray-200 rounded w-12 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                </div>

                {/* Product Name Skeleton */}
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>

                {/* Rating Skeleton */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>

                {/* Attributes Skeleton */}
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: 4 }).map((_, attrIndex) => (
                    <div key={attrIndex} className="flex justify-between">
                      <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
                    </div>
                  ))}
                </div>

                {/* Price Skeleton */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                  </div>
                </div>

                {/* Popular Badge Skeleton */}
                <div className="text-center">
                  <div className="h-6 bg-gray-200 rounded-full w-20 mx-auto animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  // Filter products based on selected car and filter type
  let filteredProducts = actualProducts.filter(product => 
    product.compatibleTireSize === actualSelectedCar.tireSize
  )

  // Apply sorting based on filter type
  switch (actualFilterType) {
    case 'all':
      // No additional sorting
      break
    case 'popular':
      filteredProducts = filteredProducts
        .filter(product => product.isPopular)
        .sort((a, b) => b.reviews - a.reviews)
      break
    case 'price_low_high':
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price)
      break
    case 'price_high_low':
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price)
      break
    default:
      break
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          ยางสำหรับ {actualSelectedCar.title}
        </h2>
        <p className="text-sm text-gray-600">
          ขนาดยาง: {actualSelectedCar.tireSize} • พบ {filteredProducts.length} รายการ
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            ไม่พบยางที่เหมาะสมสำหรับการค้นหา
          </p>
        </div>
      )}
    </div>
  )
}
