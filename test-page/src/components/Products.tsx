 'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { CircularProgress } from '@heroui/react'
import { useFilterBar } from './FilterBar'
import { TireProduct } from '../data/pageMock'
import { CarSelection } from '../data/navbarMock'
import { useCart } from '../app/providers'
import { useState } from 'react'
import GuideCard from './GuideCard'
import { pageMock } from '../data/pageMock'

type FilterType = 'all' | 'popular' | 'price_low_high' | 'price_high_low'

interface ProductsProps {
  products?: TireProduct[]
  selectedCar?: CarSelection | null
  filterType?: FilterType
}

function ProductCard({ product }: { product: TireProduct }) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [added, setAdded] = useState(false)
  
  const discountAmount = product.oldPrice ? product.oldPrice - product.price : 0
  
  // Determine attribute labels in Thai
  const getAttributeLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      comfort: 'นุ่มเงียบ',
      handling: 'การควบคุม',
      fuelEconomy: 'ประหยัดน้ำมัน',
      durability: 'ทนทาน',
      noise: 'ลดเสียงรบกวน'
    }
    return labels[key] || key
  }

  // Get the main attributes to display (limit to 5)
  const mainAttributes = Object.entries(product.attributes)
    .filter(([_, value]) => value && value > 0)
    .slice(0, 5)

  const handleAddToCart = async () => {
    setIsAdding(true)
    addToCart(product)
    setAdded(true)
    setIsAdding(false)
    
    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }
  
  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative flex flex-col min-h-[500px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Red Banner with Rating */}
      <div className="absolute top-0 left-0 z-10">
        <div className="relative">
          {/* Red Banner SVG */}
          <svg width="43" height="71" viewBox="0 0 43 71" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 -0.000183105H43V68.8091C43 70.2848 41.4565 71.2524 40.1283 70.6092L22.3717 62.0104C21.8211 61.7438 21.1789 61.7438 20.6283 62.0104L2.87169 70.6092C1.54352 71.2524 0 70.2848 0 68.8091V-0.000183105Z" fill="#E91C22"/>
          </svg>
          
          {/* CC Logo */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <svg width="20" height="21" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_3579_337)">
                <path d="M7.33447 11.4998C7.33447 13.8804 9.30946 15.8102 11.7457 15.8102C12.5967 15.8102 13.3914 15.5748 14.0653 15.1669C14.8693 14.6803 15.8662 14.3918 16.7145 14.7963L19.0053 15.8886C20.0733 16.3979 20.4756 17.7338 19.6657 18.5964C17.7014 20.6884 14.8803 21.9998 11.7457 21.9998C5.81103 21.9998 1 17.2988 1 11.4998C1 5.70083 5.81103 0.999817 11.7457 0.999817C14.6239 0.999817 17.2378 2.10551 19.1668 3.90591C20.037 4.71801 19.715 6.08562 18.6714 6.65785L16.4336 7.88487C15.6221 8.32982 14.6271 8.11175 13.805 7.68691C13.1902 7.36928 12.4895 7.18943 11.7457 7.18943C9.30946 7.18943 7.33447 9.11926 7.33447 11.4998Z" fill="white"/>
                <path d="M7.33447 11.4998C7.33447 13.8804 9.30946 15.8102 11.7457 15.8102C12.5967 15.8102 13.3914 15.5748 14.0653 15.1669C14.8693 14.6803 15.8662 14.3918 16.7145 14.7963L19.0053 15.8886C20.0733 16.3979 20.4756 17.7338 19.6657 18.5964C17.7014 20.6884 14.8803 21.9998 11.7457 21.9998C5.81103 21.9998 1 17.2988 1 11.4998C1 5.70083 5.81103 0.999817 11.7457 0.999817C14.6239 0.999817 17.2378 2.10551 19.1668 3.90591C20.037 4.71801 19.715 6.08562 18.6714 6.65785L16.4336 7.88487C15.6221 8.32982 14.6271 8.11175 13.805 7.68691C13.1902 7.36928 12.4895 7.18943 11.7457 7.18943C9.30946 7.18943 7.33447 9.11926 7.33447 11.4998Z" stroke="#E91C22" strokeLinejoin="round"/>
              </g>
              <defs>
                <filter id="filter0_d_3579_337" x="0.5" y="0.499817" width="25.0988" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dx="5" dy="4"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3579_337"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3579_337" result="shape"/>
                </filter>
              </defs>
            </svg>
          </div>
          
          {/* Rating */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white font-bold text-sm">
            {product.rating}
          </div>
        </div>
      </div>

      {/* Favorite Button */}
      <div className="absolute top-3 right-3 z-10">
        <button className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Tire Image */}
      <div className="h-48 bg-gray-50 flex items-center justify-center">
        <img 
          src="/petlas-elegant-pt311.svg" 
          alt={product.name}
          className="h-full w-full object-contain px-4 pt-4"
        />
      </div>

      <div className="p-4 space-y-3 flex-grow">
        {/* Brand Logo */}
        <div className="flex justify-start">
          <div className="h-4">
            {/* Always use Petlas logo as fallback for all brands */}
            <svg width="47" height="16" viewBox="0 0 47 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.89351 3.35553H2.59293L0.728088 15.6356H2.80781L3.23757 12.5942H7.6119C8.34468 12.5957 9.05383 12.3362 9.61118 11.8625C10.1685 11.3888 10.5373 10.7322 10.6509 10.0114L11.2879 6.15235C11.4951 4.838 10.6049 3.59242 9.27722 3.3861C9.15443 3.35553 9.02397 3.35553 8.88583 3.35553H8.89351ZM9.03164 5.8849L8.43305 10.1718C8.37933 10.5998 8.00329 10.9207 7.57353 10.936H3.59059L4.51918 5.08253H8.35631C8.7477 5.08253 9.06234 5.41112 9.06234 5.80084C9.04699 5.83141 9.04699 5.85433 9.03164 5.8849ZM20.1056 10.936H14.3269C13.759 10.936 13.2985 10.4775 13.2985 9.91202C13.2985 9.87381 13.2985 9.81268 13.3139 9.77447L13.4367 8.87276H17.4119C19.0235 8.87276 20.3819 7.69596 20.6198 6.12179L20.6582 5.81612C20.8423 4.6546 20.0212 3.56185 18.8547 3.39374C18.7473 3.37845 18.6475 3.36317 18.5324 3.36317H15.102C13.4213 3.36317 11.9786 4.5629 11.6869 6.21349L11.05 9.75155C10.7967 11.1041 11.7023 12.3955 13.0606 12.6401C13.2295 12.6554 13.3676 12.6706 13.5211 12.6706H21.2874C20.6198 12.1586 20.1056 10.9284 20.1056 10.9284V10.936ZM15.5471 5.01376C16.3222 5.02904 16.9668 5.04432 17.4657 5.02904C18.1026 5.02904 18.6168 5.48754 18.6168 6.05301C18.6168 6.32811 18.494 6.59557 18.2868 6.77132C18.0643 6.96236 17.7726 7.07699 17.4657 7.07699H13.6209C13.6209 7.07699 13.6055 4.96027 15.5548 5.01376H15.5471Z" fill="#262626"/>
              <path d="M22.2074 0.371442L21.7777 3.35931H20.1968C20.1968 3.35931 21.5014 4.28394 21.4784 5.3232C21.4554 6.36245 19.8361 10.7334 21.3556 11.8797C22.8751 13.0259 24.2334 12.491 24.2334 12.491L24.4944 10.9168C24.4944 10.9168 22.8521 11.1537 22.8828 10.0457C22.9135 8.93767 23.6732 5.00989 23.6732 5.00989H25.3385L25.6455 3.35166H23.9341L24.3486 0.3638L22.2074 0.379083V0.371442ZM26.4667 0.371442H28.5694L26.6662 12.6209H24.5634L26.4667 0.371442ZM35.1616 3.35931H28.7152L28.4082 5.08631H34.3635C34.8086 5.08631 35.1693 5.44546 35.1693 5.88867V5.97273L35.0311 7.20303H30.534C29.2524 7.34058 27.9401 8.18879 27.7866 9.48787L27.6869 10.3055C27.5487 11.4518 28.3775 12.491 29.5364 12.6133C29.6208 12.6286 29.6898 12.6286 29.7743 12.6286H36.2897L37.2336 5.69763C37.3871 4.56668 36.5967 3.52742 35.4532 3.37459C35.3458 3.35931 35.2614 3.35931 35.1616 3.35931ZM34.3404 10.9627H30.9254C30.2194 10.9627 29.6438 10.4125 29.7282 9.78589C29.7589 9.51079 29.9124 9.2739 30.1196 9.10579C30.3575 8.92239 30.6338 8.83069 30.9254 8.83069H34.6321L34.3404 10.9627ZM46.5502 3.35931L46.3123 4.97932H41.2319C40.6487 4.97932 40.1729 5.42254 40.1345 6.0033C40.0961 6.59934 40.5489 7.12661 41.1475 7.16482H43.5265C45.0384 7.16482 46.2663 8.37984 46.2663 9.90051V10.0839C46.2205 10.7769 45.9122 11.4268 45.4036 11.902C44.8949 12.3773 44.224 12.6424 43.5265 12.6438H36.7655L37.0264 10.9856H42.9817C43.5649 10.9856 44.0407 10.5271 44.0484 9.94636C44.0637 9.3656 43.5879 8.8689 43.0047 8.85361H40.1038C38.8376 8.85361 37.8246 7.84492 37.8246 6.58406V6.46179C37.8736 5.62858 38.2399 4.84534 38.8487 4.27171C39.4576 3.69808 40.2633 3.37724 41.1015 3.37459L46.5502 3.35931Z" fill="#262626"/>
            </svg>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 text-base leading-tight">{product.name}</h3>

        {/* Star Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1 text-black">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

  {/* Attribute Icons with Ratings */}
  <div className="flex items-start justify-between">
          {mainAttributes.map(([key, value], index) => (
            <div key={key} className="flex flex-col items-center gap-1">
              {/* Circular progress from HeroUI showing rating (1-5) */}
              <div className="relative w-8 h-8">
                <CircularProgress
                  value={Math.round((value / 5) * 100)}
                  className="w-8 h-8"
                  color="default"
                  classNames={{ indicator: 'text-black', track: 'text-gray-200', value: 'text-black' }}
                  aria-label={`${getAttributeLabel(key)} ${value} จาก 5`}
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-black">
                  {value}
                </span>
              </div>

              {/* Label */}
              <span className="text-xs text-gray-600 text-center leading-tight max-w-[60px]">
                {getAttributeLabel(key)}
              </span>
            </div>
          ))}
        </div>

        {/* Feature Tags */}
        <div className="flex gap-1 flex-wrap">
          {product.tags?.map((tag) => (
            <span 
              key={tag}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`font-bold text-xl ${product.oldPrice ? 'text-red-600' : 'text-black'}`}>
              ฿ {product.price.toLocaleString()}/เส้น
            </span>
            {product.oldPrice && (
              <>
                <span className="text-gray-400 line-through text-sm">
                  ฿ {product.oldPrice.toLocaleString()}
                </span>
                {product.discountPercent && (
                  <div className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded-full ml-2">
                    -{product.discountPercent}%
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add to Cart Button - Anchored to bottom */}
      <div className="p-4 pt-0">
        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
            added 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-gray-800 text-white hover:bg-gray-900'
          } ${isAdding ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isAdding ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              กำลังเพิ่ม...
            </>
          ) : added ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
              เพิ่มแล้ว
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              เพิ่มไปยังรถเข็น
            </>
          )}
        </button>
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

  // If no selected car, show hint text
  if (!actualSelectedCar) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-0 py-6">
        {/* Hint Text */}
        <div className="text-center mb-6">
          <p className="text-gray-600 text-lg font-medium">
            กรุณาเลือกรถก่อนเพื่อดูยางที่เหมาะสมกับรถของคุณ
          </p>
          <p className="text-gray-500 text-sm mt-2">
            เลือกรถของคุณเพื่อแสดงรายการยางที่ตรงกับขนาดและประเภทรถ
          </p>
        </div>
      </div>
    )
  }

  // Pick guide specific to selected car if available
  const selectedGuide = actualSelectedCar && (pageMock.guideMap?.[actualSelectedCar.id as string] ?? pageMock.guide)

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
  <div className="max-w-4xl mx-auto px-4 md:px-0 pt-2 pb-6">
      {/* Guide - only show when a car is selected */}
      {actualSelectedCar && selectedGuide && (
        <div className="mb-4">
          <div className="w-full">
            <GuideCard guide={selectedGuide} />
          </div>
        </div>
      )}
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
