'use client'

import { ShoppingCart, User, Settings2, Search, ChevronDown, X } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { selectedCar, carOptions, type CarSelection } from '../data/navbarMock'

export default function Navbar() {
  const [currentCar, setCurrentCar] = useState<CarSelection>(selectedCar)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter cars based on search query
  const filteredCars = carOptions.filter(car => {
    if (!searchQuery) return true
    
    const query = searchQuery.toLowerCase()
    
    return (
      car.year?.toString().includes(query) ||
      car.model?.toLowerCase().includes(query) ||
      car.make?.toLowerCase().includes(query) ||
      car.title.toLowerCase().includes(query)
    )
  })

  const handleCarSelect = (car: CarSelection) => {
    setCurrentCar(car)
    setIsDropdownOpen(false)
    setSearchQuery('')
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto w-full px-4 py-3">
        <div className="flex items-center justify-between lg:justify-start lg:space-x-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
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
          </div>
          
          {/* Car Selection Box - Desktop Only */}
          <div className="relative hidden lg:flex lg:flex-1 lg:max-w-md" ref={dropdownRef}>
            <motion.div 
              className="bg-[#F5F5F5] rounded-2xl p-3 cursor-pointer hover:bg-gray-200 transition-colors w-full"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-black truncate">{currentCar.title}</h3>
                  <p className="text-xs text-gray-600 truncate">{currentCar.subtitle}</p>
                </div>
                <div className="flex items-center space-x-2 ml-2">
                  <motion.button 
                    className="p-1 hover:bg-gray-300 rounded-lg transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Settings2 className="w-4 h-4 text-black" />
                  </motion.button>
                  <ChevronDown className={`w-4 h-4 text-black transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </motion.div>

            {/* Desktop Dropdown */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  className="absolute top-full left-0 right-0 mt-2 bg-[#FFFFFF] border border-gray-200 rounded-2xl shadow-lg z-50 max-h-96 overflow-hidden overflow-x-hidden"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* Search Section */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="ค้นหาตามปี ชื่อ ยี่ห้อ"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E91C22] focus:border-transparent text-black"
                      />
                      {searchQuery && (
                        <motion.button
                          onClick={clearSearch}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Car List */}
                  <div className="max-h-64 overflow-y-auto">
                    {filteredCars.length > 0 ? (
                      filteredCars.map((car) => (
                        <motion.div
                          key={car.id}
                          onClick={() => handleCarSelect(car)}
                          className={`p-4 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                            car.id === currentCar.id 
                              ? 'bg-red-50 border-red-200 hover:bg-red-100' 
                              : 'hover:bg-gray-50'
                          }`}
                          whileTap={{ scale: 0.99 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-black truncate">{car.title}</h4>
                              <p className="text-sm text-gray-600 truncate">{car.subtitle}</p>
                              <div className="flex gap-2 mt-1">
                                <span className="text-xs bg-[#F5F5F5] text-black px-2 py-1 rounded truncate max-w-20">
                                  {car.year}
                                </span>
                                <span className="text-xs bg-[#F5F5F5] text-black px-2 py-1 rounded truncate max-w-24">
                                  {car.make}
                                </span>
                              </div>
                            </div>
                            {car.id === currentCar.id && (
                              <motion.div 
                                className="text-[#E91C22] text-sm font-medium"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1 }}
                              >
                                เลือกแล้ว
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div 
                        className="p-4 text-center text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        ไม่พบรถที่ตรงกับการค้นหา
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
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
      </div>

      {/* Car Selection Box - Mobile Only */}
      <div className="relative w-full lg:hidden mt-3 px-4" ref={dropdownRef}>
        <motion.div 
          className="bg-[#F5F5F5] rounded-2xl p-3 cursor-pointer hover:bg-gray-200 transition-colors"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-black">{currentCar.title}</h3>
              <p className="text-sm text-gray-600">{currentCar.subtitle}</p>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button 
                className="p-2 hover:bg-gray-300 rounded-lg transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <Settings2 className="w-5 h-5 text-black" />
              </motion.button>
              <ChevronDown className={`w-5 h-5 text-black transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </motion.div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div 
              className="absolute top-full left-4 right-4 mt-2 bg-[#FFFFFF] border border-gray-200 rounded-2xl shadow-lg z-50 max-h-96 overflow-hidden overflow-x-hidden lg:hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Search Section */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ค้นหาตามปี ชื่อ ยี่ห้อ"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E91C22] focus:border-transparent text-black"
                  />
                  {searchQuery && (
                    <motion.button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Car List */}
              <div className="max-h-64 overflow-y-auto">
                {filteredCars.length > 0 ? (
                  filteredCars.map((car) => (
                    <motion.div
                      key={car.id}
                      onClick={() => handleCarSelect(car)}
                      className={`p-4 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                        car.id === currentCar.id 
                          ? 'bg-red-50 border-red-200 hover:bg-red-100' 
                          : 'hover:bg-gray-50'
                      }`}
                      whileTap={{ scale: 0.99 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-black truncate">{car.title}</h4>
                          <p className="text-sm text-gray-600 truncate">{car.subtitle}</p>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs bg-[#F5F5F5] text-black px-2 py-1 rounded truncate max-w-20">
                              {car.year}
                            </span>
                            <span className="text-xs bg-[#F5F5F5] text-black px-2 py-1 rounded truncate max-w-24">
                              {car.make}
                            </span>
                          </div>
                        </div>
                        {car.id === currentCar.id && (
                          <motion.div 
                            className="text-[#E91C22] text-sm font-medium"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            เลือกแล้ว
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    className="p-4 text-center text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    ไม่พบรถที่ตรงกับการค้นหา
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}