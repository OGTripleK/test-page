'use client'

import { Tabs, Tab } from '@heroui/react'
import { motion } from 'framer-motion'
import { createContext, useContext, useState, ReactNode } from 'react'
import { TireProduct } from '../data/pageMock'
import { CarSelection } from '../data/navbarMock'

type FilterType = 'all' | 'popular' | 'price_low_high' | 'price_high_low'

type TyreFilterSelections = {
  brand: string | null
  priceRange: string | null
  feature: string | null
}

type FilterBarContextValue = {
  selectedFilter: FilterType
  setSelectedFilter: (filter: FilterType) => void
  tyreFilterSelections: TyreFilterSelections
  setTyreFilterSelections: (selections: TyreFilterSelections) => void
  filteredProducts: TireProduct[]
  selectedCar: CarSelection | null
  filterCounts: { all: number; popular: number; price_low_high: number; price_high_low: number }
}

const FilterBarContext = createContext<FilterBarContextValue | null>(null)

export function FilterBarProvider({ 
  children, 
  products, 
  selectedCar 
}: { 
  children: ReactNode
  products: TireProduct[]
  selectedCar: CarSelection | null
}) {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all')
  const [tyreFilterSelections, setTyreFilterSelections] = useState<TyreFilterSelections>({
    brand: null,
    priceRange: null,
    feature: null
  })

  const getFilteredProducts = (): TireProduct[] => {
    if (!selectedCar) return []

    // Filter products by selected car's tire size
    let carProducts = products.filter(product => 
      product.compatibleTireSize === selectedCar.tireSize
    )

    // Apply TyreFilter selections
    if (tyreFilterSelections.brand) {
      carProducts = carProducts.filter(product => 
        product.brand.toLowerCase() === tyreFilterSelections.brand!.toLowerCase()
      )
    }

    if (tyreFilterSelections.priceRange) {
      const range = tyreFilterSelections.priceRange
      let min = 0, max = Infinity
      
      if (range === '0-2000') {
        max = 2000
      } else if (range === '2000-4000') {
        min = 2000
        max = 4000
      } else if (range === '4000-6000') {
        min = 4000
        max = 6000
      } else if (range === '6000-8000') {
        min = 6000
        max = 8000
      } else if (range === '8000-10000') {
        min = 8000
        max = 10000
      } else if (range === '10000+') {
        min = 10000
      }
      
      carProducts = carProducts.filter(product => 
        product.price >= min && product.price <= max
      )
    }

    if (tyreFilterSelections.feature) {
      carProducts = carProducts.filter(product => {
        const featureMap: { [key: string]: string[] } = {
          'eco-friendly': ['ประหยัดน้ำมัน'],
          'wet-grip': [], // No specific tag for wet grip
          'low-noise': [], // No specific tag for low noise
          'long-lasting': [], // No specific tag for durability
          'all-season': [], // No specific tag for all-season
          'sport': ['Performance'],
          'comfort': [], // No specific tag for comfort
          'off-road': ['All Terrain', 'SUV', 'Pickup']
        }
        
        const tags = featureMap[tyreFilterSelections.feature!] || []
        
        // If no specific tags, filter by attributes
        if (tags.length === 0) {
          const attributeMap: { [key: string]: keyof TireProduct['attributes'] } = {
            'wet-grip': 'handling',
            'low-noise': 'noise',
            'long-lasting': 'durability',
            'all-season': 'comfort',
            'comfort': 'comfort'
          }
          
          const attribute = attributeMap[tyreFilterSelections.feature!]
          return attribute && product.attributes[attribute] && product.attributes[attribute]! >= 4
        }
        
        return tags.some(tag => product.tags?.includes(tag))
      })
    }

    // Apply sorting based on selected filter
    switch (selectedFilter) {
      case 'all':
        return carProducts
      case 'popular':
        return carProducts
          .filter(product => product.isPopular)
          .sort((a, b) => b.reviews - a.reviews)
      case 'price_low_high':
        return carProducts.sort((a, b) => a.price - b.price)
      case 'price_high_low':
        return carProducts.sort((a, b) => b.price - a.price)
      default:
        return carProducts
    }
  }

  const getFilterCounts = () => {
    if (!selectedCar) return { all: 0, popular: 0, price_low_high: 0, price_high_low: 0 }

    const carProducts = products.filter(product => 
      product.compatibleTireSize === selectedCar.tireSize
    )

    // Apply TyreFilter selections to base counts
    let filteredProducts = carProducts
    if (tyreFilterSelections.brand) {
      filteredProducts = filteredProducts.filter(product => 
        product.brand.toLowerCase() === tyreFilterSelections.brand!.toLowerCase()
      )
    }
    if (tyreFilterSelections.priceRange) {
      // Apply same price filtering logic
      const range = tyreFilterSelections.priceRange
      let min = 0, max = Infinity
      
      if (range === '0-2000') {
        max = 2000
      } else if (range === '2000-4000') {
        min = 2000
        max = 4000
      } else if (range === '4000-6000') {
        min = 4000
        max = 6000
      } else if (range === '6000-8000') {
        min = 6000
        max = 8000
      } else if (range === '8000-10000') {
        min = 8000
        max = 10000
      } else if (range === '10000+') {
        min = 10000
      }
      
      filteredProducts = filteredProducts.filter(product => 
        product.price >= min && product.price <= max
      )
    }
    if (tyreFilterSelections.feature) {
      filteredProducts = filteredProducts.filter(product => {
        const featureMap: { [key: string]: string[] } = {
          'eco-friendly': ['ประหยัดน้ำมัน'],
          'wet-grip': [],
          'low-noise': [],
          'long-lasting': [],
          'all-season': [],
          'sport': ['Performance'],
          'comfort': [],
          'off-road': ['All Terrain', 'SUV', 'Pickup']
        }
        
        const tags = featureMap[tyreFilterSelections.feature!] || []
        
        if (tags.length === 0) {
          const attributeMap: { [key: string]: keyof TireProduct['attributes'] } = {
            'wet-grip': 'handling',
            'low-noise': 'noise',
            'long-lasting': 'durability',
            'all-season': 'comfort',
            'comfort': 'comfort'
          }
          
          const attribute = attributeMap[tyreFilterSelections.feature!]
          return attribute && product.attributes[attribute] && product.attributes[attribute]! >= 4
        }
        
        return tags.some(tag => product.tags?.includes(tag))
      })
    }

    return {
      all: filteredProducts.length,
      popular: filteredProducts.filter(product => product.isPopular).length,
      price_low_high: filteredProducts.length,
      price_high_low: filteredProducts.length,
    }
  }

  const filteredProducts = getFilteredProducts()
  const filterCounts = getFilterCounts()

  return (
    <FilterBarContext.Provider value={{
      selectedFilter,
      setSelectedFilter,
      tyreFilterSelections,
      setTyreFilterSelections,
      filteredProducts,
      selectedCar,
      filterCounts,
    }}>
      {children}
    </FilterBarContext.Provider>
  )
}

export function useFilterBar() {
  const ctx = useContext(FilterBarContext)
  if (!ctx) throw new Error('useFilterBar must be used within FilterBarProvider')
  return ctx
}

export default function FilterBar() {
  const { selectedFilter, setSelectedFilter, selectedCar, filterCounts } = useFilterBar()

  // Don't show filter bar if no car is selected
  if (!selectedCar) return null

  const handleSelectionChange = (key: string | number) => {
    setSelectedFilter(key as FilterType)
  }

  return (
    <motion.div 
      className="bg-white"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center">
          <Tabs
            selectedKey={selectedFilter}
            onSelectionChange={handleSelectionChange}
            variant="underlined"
            classNames={{
              base: "w-full",
              // make the tab list horizontally scrollable on small screens
              tabList: "w-full relative rounded-none p-0 border-b-0 bg-transparent overflow-x-auto flex-nowrap whitespace-nowrap scrollbar-hide",
              cursor: "w-full bg-black h-[2px] rounded-none bottom-0",
              // keep each tab from shrinking so they can be scrolled horizontally
              tab: "max-w-fit px-2 h-12 flex items-center bg-transparent data-[hover-unselected=true]:opacity-80 flex-shrink-0",
              tabContent: "group-data-[selected=true]:text-black group-data-[selected=true]:font-medium text-gray-600 font-normal text-sm transition-colors"
            }}
          >
            <Tab key="all" title={`ทั้งหมด (${filterCounts.all})`} />
            <Tab key="popular" title="ยอดนิยม" />
            <Tab key="price_low_high" title="ราคา: ต่ำ ไป สูง" />
            <Tab key="price_high_low" title="ราคา: สูง ไป ต่ำ" />
          </Tabs>
        </div>
      </div>
      
    </motion.div>
  )
}
