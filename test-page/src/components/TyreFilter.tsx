'use client'

import { Select, SelectItem } from '@heroui/react'
import { motion } from 'framer-motion'
import { useFilterBar } from './FilterBar'
import type { SharedSelection } from '@heroui/react'

// Options are derived dynamically from available products (not hardcoded)

export default function TyreFilter() {
  const { selectedCar, tyreFilterSelections, setTyreFilterSelections, filteredProducts, allCarProducts } = useFilterBar()

  // Don't show tyre filter if no car is selected
  if (!selectedCar) return null

  const handleBrandChange = (keys: SharedSelection) => {
  const selectedKey = keys.currentKey === 'all' ? null : keys.currentKey || null
    setTyreFilterSelections({
      ...tyreFilterSelections,
      brand: selectedKey
    })
  }

  const handlePriceChange = (keys: SharedSelection) => {
  const selectedKey = keys.currentKey === 'all' ? null : keys.currentKey || null
    setTyreFilterSelections({
      ...tyreFilterSelections,
      priceRange: selectedKey
    })
  }

  const handleFeatureChange = (keys: SharedSelection) => {
  const selectedKey = keys.currentKey === 'all' ? null : keys.currentKey || null
    setTyreFilterSelections({
      ...tyreFilterSelections,
      feature: selectedKey
    })
  }

  // Derive options dynamically from allCarProducts
  const tireBrands = Array.from(new Set(allCarProducts.map(p => p.brand))).map(b => ({ key: b.toLowerCase(), label: b }))

  // Determine which price ranges are actually represented in the products
  const PRICE_BUCKETS = [
    { key: '0-2000', label: '0 - 2,000 บาท', min: 0, max: 2000 },
    { key: '2000-4000', label: '2,000 - 4,000 บาท', min: 2000, max: 4000 },
    { key: '4000-6000', label: '4,000 - 6,000 บาท', min: 4000, max: 6000 },
    { key: '6000-8000', label: '6,000 - 8,000 บาท', min: 6000, max: 8000 },
    { key: '8000-10000', label: '8,000 - 10,000 บาท', min: 8000, max: 10000 },
    { key: '10000+', label: '10,000+ บาท', min: 10000, max: Infinity },
  ]

  const priceRanges = PRICE_BUCKETS.filter(bucket =>
    allCarProducts.some(p => p.price >= bucket.min && p.price <= bucket.max)
  )

  // Features are mapped via same map used in FilterBar.tsx so options are consistent
  const featureMap: { key: string; label: string }[] = [
    { key: 'eco-friendly', label: 'ประหยัดน้ำมัน' },
    { key: 'wet-grip', label: 'เกาะถนนเปียก' },
    { key: 'low-noise', label: 'เงียบ' },
    { key: 'long-lasting', label: 'ทนทาน' },
    { key: 'all-season', label: 'ใช้ได้ทุกฤดู' },
    { key: 'sport', label: 'สปอร์ต' },
    { key: 'comfort', label: 'นุ่มสบาย' },
    { key: 'off-road', label: 'วิ่งออฟโรด' }
  ]

  // Only include features that match at least one product (by tags or attributes)
  const features = featureMap.filter(f => {
    // tags-based features
    const tagMap: { [k: string]: string[] } = {
      'eco-friendly': ['ประหยัดน้ำมัน'],
      'sport': ['Performance'],
      'off-road': ['All Terrain', 'SUV', 'Pickup']
    }

    const tags = tagMap[f.key] || []
    if (tags.length > 0) {
      return allCarProducts.some(p => p.tags?.some(t => tags.includes(t)))
    }

    // attribute-based features (require attribute >= 4)
    const attributeMap: { [k: string]: keyof typeof allCarProducts[number]['attributes'] } = {
      'wet-grip': 'handling',
      'low-noise': 'noise',
      'long-lasting': 'durability',
      'all-season': 'comfort',
      'comfort': 'comfort'
    }

    const attr = attributeMap[f.key]
    if (attr) return allCarProducts.some(p => (p.attributes[attr] || 0) >= 4)

    return false
  })

  return (
    <motion.div 
      className="bg-white"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
    >
  <div className="max-w-4xl mx-auto px-4 md:px-0 py-4">
        <div className="grid grid-cols-3 gap-4">
          {/* ยี่ห้อยาง - Tire Brand */}
          <Select 
            className="max-w-full" 
            label="ยี่ห้อยาง"
            items={[{ key: 'all', label: 'ทั้งหมด' }, ...tireBrands]}
            selectedKeys={tyreFilterSelections.brand ? [tyreFilterSelections.brand] : []}
            onSelectionChange={handleBrandChange}
            classNames={{
              trigger: "bg-gray-100 h-10 min-h-0 py-1 px-3 flex rounded-12",
              value: "text-sm text-gray-900",
              label: "text-gray-700 font-medium",
              selectorIcon: "text-black",
              popoverContent: "w-fit"
            }}
          >
            {(item) => (
              <SelectItem key={item.key} className="text-black whitespace-nowrap">{item.label}</SelectItem>
            )}
          </Select>

          {/* ราคา - Price Range */}
          <Select 
            className="max-w-full" 
            label="ราคา"
            items={[{ key: 'all', label: 'ทั้งหมด' }, ...priceRanges]}
            selectedKeys={tyreFilterSelections.priceRange ? [tyreFilterSelections.priceRange] : []}
            onSelectionChange={handlePriceChange}
            classNames={{
              trigger: "bg-gray-100 h-10 min-h-0 py-1 px-3 flex rounded-12",
              value: "text-sm text-gray-900",
              label: "text-gray-700 font-medium",
              selectorIcon: "text-black",
              popoverContent: "w-fit"
            }}
          >
            {(item) => (
              <SelectItem key={item.key} className="text-black whitespace-nowrap">{item.label}</SelectItem>
            )}
          </Select>

          {/* คุณสมบัติ - Features */}
          <Select 
            className="max-w-full" 
            label="คุณสมบัติ"
            items={[{ key: 'all', label: 'ทั้งหมด' }, ...features]}
            selectedKeys={tyreFilterSelections.feature ? [tyreFilterSelections.feature] : []}
            onSelectionChange={handleFeatureChange}
            classNames={{
              trigger: "bg-gray-100 h-10 min-h-0 py-1 px-3 flex rounded-12",
              value: "text-sm text-gray-900",
              label: "text-gray-700 font-medium",
              selectorIcon: "text-black",
              popoverContent: "w-fit"
            }}
          >
            {(item) => (
              <SelectItem key={item.key} className="text-black whitespace-nowrap">{item.label}</SelectItem>
            )}
          </Select>
        </div>
      </div>
    </motion.div>
  )
}
