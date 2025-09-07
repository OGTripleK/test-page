'use client'

import { Tabs, Tab } from '@heroui/react'
import { motion } from 'framer-motion'
import { createContext, useContext, useState, ReactNode } from 'react'
import { TireProduct } from '../data/pageMock'
import { CarSelection } from '../data/navbarMock'

type FilterType = 'all' | 'popular' | 'price_low_high' | 'price_high_low'

type FilterBarContextValue = {
  selectedFilter: FilterType
  setSelectedFilter: (filter: FilterType) => void
  filteredProducts: TireProduct[]
  selectedCar: CarSelection | null
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

  const getFilteredProducts = (): TireProduct[] => {
    if (!selectedCar) return []

    // Filter products by selected car's tire size
    let carProducts = products.filter(product => 
      product.compatibleTireSize === selectedCar.tireSize
    )

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

  const filteredProducts = getFilteredProducts()

  return (
    <FilterBarContext.Provider value={{
      selectedFilter,
      setSelectedFilter,
      filteredProducts,
      selectedCar,
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
  const { selectedFilter, setSelectedFilter, selectedCar } = useFilterBar()

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
              tabList: "gap-8 w-full relative rounded-none p-0 border-b-0 bg-transparent",
              cursor: "w-full bg-black h-[2px] rounded-none bottom-0",
              tab: "max-w-fit px-0 h-12 flex items-center bg-transparent data-[hover-unselected=true]:opacity-80",
              tabContent: "group-data-[selected=true]:text-black group-data-[selected=true]:font-medium text-gray-600 font-normal text-sm transition-colors"
            }}
          >
            <Tab key="all" title="ทั้งหมด" />
            <Tab key="popular" title="ยอดนิยม" />
            <Tab key="price_low_high" title="ราคา: ต่ำ ไป สูง" />
            <Tab key="price_high_low" title="ราคา: สูง ไป ต่ำ" />
          </Tabs>
        </div>
      </div>
    </motion.div>
  )
}
