'use client'

import { ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import CarSelectDesktop, { CarSelectMobile, useCarSelect } from './CarSelect'
import FilterBar from './FilterBar'
import TyreFilter from './TyreFilter'

export default function Navbar() {
  const { clearCar } = useCarSelect()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
  <div className="max-w-4xl mx-auto w-full px-4 md:px-0 py-3">
        <div className="flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={clearCar}
          whileTap={{ scale: 0.95 }}
        >
          <Image 
            src="/logo.svg" 
            alt="22 Circles Logo" 
            width={32} 
            height={32}
            className="w-8 h-8"
          />
          <Image 
            src="/22circles.svg" 
            alt="22 Circles Text Logo" 
            width={80} 
            height={12}
            className="h-3"
          />
        </motion.div>
        
        <CarSelectDesktop />
        
        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <motion.button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="w-5 h-5 text-black fill-black" />
          </motion.button>
          <motion.button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-5 h-5 text-black fill-black" />
          </motion.button>
        </div>
      </div>

      {/* Mobile car select inside navbar for mobile only!! */}
      <CarSelectMobile />
      </div>
      
      {/* Filter Bar - shows only when car is selected */}
      <FilterBar />
  {/* TyreFilter positioned under the FilterBar inside the navbar */}
  <TyreFilter />
    </nav>
  )
}