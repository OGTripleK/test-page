'use client'

import { Select, SelectItem } from '@heroui/react'
import { motion } from 'framer-motion'
import { useFilterBar } from './FilterBar'

// Mock data for the select options
const tireBrands = [
  { key: 'michelin', label: 'Michelin' },
  { key: 'bridgestone', label: 'Bridgestone' },
  { key: 'goodyear', label: 'Goodyear' },
  { key: 'pirelli', label: 'Pirelli' },
  { key: 'continental', label: 'Continental' },
  { key: 'yokohama', label: 'Yokohama' },
  { key: 'dunlop', label: 'Dunlop' },
  { key: 'falken', label: 'Falken' }
]

const priceRanges = [
  { key: '0-2000', label: '0 - 2,000 บาท' },
  { key: '2000-4000', label: '2,000 - 4,000 บาท' },
  { key: '4000-6000', label: '4,000 - 6,000 บาท' },
  { key: '6000-8000', label: '6,000 - 8,000 บาท' },
  { key: '8000-10000', label: '8,000 - 10,000 บาท' },
  { key: '10000+', label: '10,000+ บาท' }
]

const features = [
  { key: 'eco-friendly', label: 'ประหยัดน้ำมัน' },
  { key: 'wet-grip', label: 'เกาะถนนเปียก' },
  { key: 'low-noise', label: 'เงียบ' },
  { key: 'long-lasting', label: 'ทนทาน' },
  { key: 'all-season', label: 'ใช้ได้ทุกฤดู' },
  { key: 'sport', label: 'สปอร์ต' },
  { key: 'comfort', label: 'นุ่มสบาย' },
  { key: 'off-road', label: 'วิ่งออฟโรด' }
]

export default function TyreFilter() {
  const { selectedCar, tyreFilterSelections, setTyreFilterSelections } = useFilterBar()

  // Don't show tyre filter if no car is selected
  if (!selectedCar) return null

  const handleBrandChange = (keys: any) => {
    const selectedKey = keys.currentKey || null
    setTyreFilterSelections({
      ...tyreFilterSelections,
      brand: selectedKey
    })
  }

  const handlePriceChange = (keys: any) => {
    const selectedKey = keys.currentKey || null
    setTyreFilterSelections({
      ...tyreFilterSelections,
      priceRange: selectedKey
    })
  }

  const handleFeatureChange = (keys: any) => {
    const selectedKey = keys.currentKey || null
    setTyreFilterSelections({
      ...tyreFilterSelections,
      feature: selectedKey
    })
  }

  return (
    <motion.div 
      className="bg-white"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="grid grid-cols-3 gap-4">
          {/* ยี่ห้อยาง - Tire Brand */}
          <Select 
            className="max-w-full" 
            label="ยี่ห้อยาง"
            selectedKeys={tyreFilterSelections.brand ? [tyreFilterSelections.brand] : []}
            onSelectionChange={handleBrandChange}
            classNames={{
              trigger: "bg-gray-100 h-10 min-h-0 py-1 px-3 flex",
              value: "text-sm text-gray-900",
              label: "text-gray-700 font-medium",
              selectorIcon: "text-black"
            }}
          >
            {tireBrands.map((brand) => (
              <SelectItem key={brand.key} className="text-black">{brand.label}</SelectItem>
            ))}
          </Select>

          {/* ราคา - Price Range */}
          <Select 
            className="max-w-full" 
            label="ราคา"
            selectedKeys={tyreFilterSelections.priceRange ? [tyreFilterSelections.priceRange] : []}
            onSelectionChange={handlePriceChange}
            classNames={{
              trigger: "bg-gray-100 h-10 min-h-0 py-1 px-3 flex",
              value: "text-sm text-gray-900",
              label: "text-gray-700 font-medium",
              selectorIcon: "text-black"
            }}
          >
            {priceRanges.map((price) => (
              <SelectItem key={price.key} className="text-black">{price.label}</SelectItem>
            ))}
          </Select>

          {/* คุณสมบัติ - Features */}
          <Select 
            className="max-w-full" 
            label="คุณสมบัติ"
            selectedKeys={tyreFilterSelections.feature ? [tyreFilterSelections.feature] : []}
            onSelectionChange={handleFeatureChange}
            classNames={{
              trigger: "bg-gray-100 h-10 min-h-0 py-1 px-3 flex",
              value: "text-sm text-gray-900",
              label: "text-gray-700 font-medium",
              selectorIcon: "text-black"
            }}
          >
            {features.map((feature) => (
              <SelectItem key={feature.key} className="text-black">{feature.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </motion.div>
  )
}
