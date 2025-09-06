'use client'

import { ShoppingCart, User, Settings2, Search, ChevronDown, X } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { selectedCar, carOptions, type CarSelection } from '../data/navbarMock'

export default function Navbar() {
  const [currentCar, setCurrentCar] = useState<CarSelection>(selectedCar)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'year' | 'name' | 'brand'>('all')
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

  // Filter cars based on search query and selected filter
  const filteredCars = carOptions.filter(car => {
    if (!searchQuery) return true
    
    const query = searchQuery.toLowerCase()
    
    switch (selectedFilter) {
      case 'year':
        return car.year?.toString().includes(query)
      case 'name':
        return car.model?.toLowerCase().includes(query) || car.title.toLowerCase().includes(query)
      case 'brand':
        return car.make?.toLowerCase().includes(query)
      default:
        return (
          car.year?.toString().includes(query) ||
          car.model?.toLowerCase().includes(query) ||
          car.make?.toLowerCase().includes(query) ||
          car.title.toLowerCase().includes(query)
        )
    }
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
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto w-full px-4 py-3">
  <div className="flex items-center justify-between">
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
            alt="22 Circles" 
            width={80} 
            height={12}
            className="h-3"
          />
        </div>
        
        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5 text-black fill-black" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <User className="w-5 h-5 text-black fill-black" />
          </button>
        </div>
        </div>
      </div>

      {/* Car Selection Box */}
      <div className="relative w-full lg:max-w-3xl lg:mx-auto mt-3" ref={dropdownRef}>
        <div 
          className="bg-gray-100 rounded-2xl p-4 cursor-pointer hover:bg-gray-200 transition-colors"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{currentCar.title}</h3>
              <p className="text-sm text-gray-500">{currentCar.subtitle}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-300 rounded-lg transition-colors">
                <Settings2 className="w-5 h-5 text-black" />
              </button>
              <ChevronDown 
                className={`w-5 h-5 text-black transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
              />
            </div>
          </div>
        </div>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 max-h-96 overflow-hidden">
            {/* Search Section */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedFilter === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedFilter('year')}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedFilter === 'year'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Year
                </button>
                <button
                  onClick={() => setSelectedFilter('name')}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedFilter === 'name'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Name
                </button>
                <button
                  onClick={() => setSelectedFilter('brand')}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedFilter === 'brand'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Car Brand
                </button>
              </div>
            </div>

            {/* Car List */}
            <div className="max-h-64 overflow-y-auto">
              {filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                  <div
                    key={car.id}
                    onClick={() => handleCarSelect(car)}
                    className={`p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                      car.id === currentCar.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{car.title}</h4>
                        <p className="text-sm text-gray-500">{car.subtitle}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {car.year}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {car.make}
                          </span>
                        </div>
                      </div>
                      {car.id === currentCar.id && (
                        <div className="text-blue-500 text-sm font-medium">Selected</div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No cars found matching your search
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}