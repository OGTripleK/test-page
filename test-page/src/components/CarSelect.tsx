"use client"

import { Search, X, Settings2 } from 'lucide-react'
import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type CarSelection } from '../data/navbarMock'

// Custom hook for scroll direction detection with mobile-optimized thresholds
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      
      // Reduced threshold for more responsive mobile behavior - collapse faster on scroll down
      const threshold = direction === 'down' ? 5 : 10 // More sensitive to downward scroll
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > threshold || scrollY - lastScrollY < -threshold)) {
        setScrollDirection(direction)
      }
      setLastScrollY(scrollY > 0 ? scrollY : 0)
    }

    const onScroll = () => window.requestAnimationFrame(updateScrollDirection)
    window.addEventListener('scroll', onScroll)
    
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollDirection, lastScrollY])

  return scrollDirection
}

type CarSelectContextValue = {
  currentCar: CarSelection | null
  setCurrentCar: (c: CarSelection | null) => void
  isDropdownOpen: boolean
  setIsDropdownOpen: (v: boolean) => void
  searchQuery: string
  setSearchQuery: (s: string) => void
  filteredCars: CarSelection[]
  handleCarSelect: (c: CarSelection) => void
  clearSearch: () => void
  clearCar: () => void
  desktopDropdownRef: React.RefObject<HTMLDivElement | null>
  mobileDropdownRef: React.RefObject<HTMLDivElement | null>
}

const CarSelectContext = createContext<CarSelectContextValue | null>(null)

export function CarSelectProvider({ children, carOptions }: { children: ReactNode, carOptions: CarSelection[] }) {
  const [currentCar, setCurrentCar] = useState<CarSelection | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const desktopDropdownRef = useRef<HTMLDivElement>(null)
  const mobileDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node

      if (
        desktopDropdownRef.current?.contains(target) ||
        mobileDropdownRef.current?.contains(target)
      ) {
        return
      }

      setIsDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredCars = carOptions.filter(car => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      car.year?.toString().includes(query) ||
      car.model?.toLowerCase().includes(query) ||
      car.make?.toLowerCase().includes(query) ||
      car.title.toLowerCase().includes(query)
    )
  }).sort((a, b) => {
    if (currentCar && a.id === currentCar.id) return -1
    if (currentCar && b.id === currentCar.id) return 1
    return 0
  })

  const handleCarSelect = (car: CarSelection) => {
    setCurrentCar(car)
    setIsDropdownOpen(false)
    setSearchQuery('')
  }

  const clearSearch = () => setSearchQuery('')

  const clearCar = () => {
    setCurrentCar(null)
    setIsDropdownOpen(false)
    setSearchQuery('')
  }

  return (
    <CarSelectContext.Provider value={{
      currentCar,
      setCurrentCar,
      isDropdownOpen,
      setIsDropdownOpen,
      searchQuery,
      setSearchQuery,
      filteredCars,
      handleCarSelect,
      clearSearch,
      clearCar,
      desktopDropdownRef,
      mobileDropdownRef,
    }}>
      {children}
    </CarSelectContext.Provider>
  )
}

function useCarSelect() {
  const ctx = useContext(CarSelectContext)
  if (!ctx) throw new Error('useCarSelect must be used within CarSelectProvider')
  return ctx
}

export { useCarSelect }

export function CarSelectDesktop() {
  const {
    currentCar,
    isDropdownOpen,
    setIsDropdownOpen,
    searchQuery,
    setSearchQuery,
    filteredCars,
    handleCarSelect,
    clearSearch,
    clearCar,
    desktopDropdownRef,
  } = useCarSelect()

  return (
    <div className="relative hidden md:flex md:flex-1 md:max-w-md" ref={desktopDropdownRef}>
      <motion.div 
        className="bg-[#F5F5F5] rounded-12 p-3 cursor-pointer hover:bg-gray-200 transition-colors w-full"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-black truncate">{currentCar ? currentCar.title : 'ค้นหายางตามรุ่นรถ'}</h3>
            <p className="text-xs text-gray-600 truncate">{currentCar ? currentCar.subtitle : 'โปรดเลือกรุ่นรถยนต์'}</p>
          </div>
          <div className="flex items-center space-x-2 ml-2">
            {currentCar && (
              <motion.button 
                onClick={(e) => {
                  e.stopPropagation()
                  clearCar()
                }}
                className="p-1 hover:bg-gray-300 rounded-lg transition-colors"
                whileTap={{ scale: 0.95 }}
                title="ล้างการเลือกรถ"
              >
                <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
              </motion.button>
            )}
            <motion.button 
              className="p-1 hover:bg-gray-300 rounded-lg transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Settings2 className="w-4 h-4 text-black" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div 
            className="absolute top-full left-0 right-0 mt-2 bg-[#FFFFFF] border border-gray-200 rounded-12 shadow-lg z-50 max-h-96 overflow-hidden overflow-x-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
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

            <div className="max-h-64 overflow-y-auto">
              {filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                  <motion.div
                    key={car.id}
                    onClick={() => handleCarSelect(car)}
                    className={`p-4 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                      car.id === currentCar?.id 
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
                      {car.id === currentCar?.id && (
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
  )
}

export function CarSelectMobile() {
  const {
    currentCar,
    isDropdownOpen,
    setIsDropdownOpen,
    searchQuery,
    setSearchQuery,
    filteredCars,
    handleCarSelect,
    clearSearch,
    clearCar,
    mobileDropdownRef,
  } = useCarSelect()

  const scrollDirection = useScrollDirection()
  const [isVisible, setIsVisible] = useState(true)
  const [forceVisible, setForceVisible] = useState(false)
  const touchMovedRef = useRef(false)
  const isScrollingRef = useRef(false)
  const touchStartRef = useRef<{ x: number; y: number; t: number } | null>(null)

  useEffect(() => {
    // Immediate collapse on any downward scroll to support short swipes.
    if (scrollDirection === 'down' && !isDropdownOpen && !forceVisible) {
      setIsVisible(false)
    } else if (scrollDirection === 'up' || isDropdownOpen || forceVisible) {
      setIsVisible(true)
    }
  }, [scrollDirection, isDropdownOpen, forceVisible])

  // Reset force visible immediately after dropdown closes
  useEffect(() => {
    if (!isDropdownOpen) {
      setForceVisible(false)
    }
  }, [isDropdownOpen])

  // Track native scrolling to avoid accidental toggles while user is scrolling quickly
  useEffect(() => {
    const onScroll = () => {
      // Mark scrolling for the current frame only to avoid blocking taps longer than necessary
      isScrollingRef.current = true
      window.requestAnimationFrame(() => {
        isScrollingRef.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleCarSelectClick = (e?: React.MouseEvent) => {
    // If a touch/move or native scroll was detected recently, treat this as a scroll, not a tap
    if (touchMovedRef.current || isScrollingRef.current) {
      // stop propagation for safety when called from a synthetic click after touch
      e?.stopPropagation?.()
      return
    }

    if (!isVisible) {
      setForceVisible(true)
    }
    setIsDropdownOpen(!isDropdownOpen)
  }

  const onTouchStart = (ev: React.TouchEvent) => {
    touchMovedRef.current = false
    const t = ev.touches && ev.touches[0]
    if (t) touchStartRef.current = { x: t.clientX, y: t.clientY, t: performance.now() }
  }

  const onTouchMove = (ev: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const t = ev.touches && ev.touches[0]
    if (!t) return
    const dx = t.clientX - touchStartRef.current.x
    const dy = t.clientY - touchStartRef.current.y
    // very small threshold: treat any vertical movement >= 1px as a swipe
    if (Math.abs(dy) >= 1) {
      touchMovedRef.current = true
    }
    // update last known position so short swipes are captured on end
    touchStartRef.current = { x: touchStartRef.current.x, y: touchStartRef.current.y, t: touchStartRef.current.t }
    // store last move position on the event target for end calculation via changedTouches
  }

  const onTouchEnd = (ev: React.TouchEvent) => {
    const changed = ev.changedTouches && ev.changedTouches[0]
    const start = touchStartRef.current
    if (changed && start) {
      const endY = changed.clientY
      const dy = endY - start.y

      // Any vertical movement (even small) should control visibility by direction
      if (Math.abs(dy) >= 1) {
        if (dy > 0) {
          // finger moved down -> expand
          setIsVisible(true)
        } else {
          // finger moved up -> collapse
          setIsVisible(false)
        }
        touchMovedRef.current = true
      }
    }

    // Suppress the synthetic click for a single frame when a move happened
    if (touchMovedRef.current) {
      window.requestAnimationFrame(() => {
        touchMovedRef.current = false
      })
    }

    touchStartRef.current = null
  }

  return (
    <motion.div 
      className="relative w-full md:hidden"
      ref={mobileDropdownRef}
      initial={{ height: 'auto', marginTop: 16 }}
      animate={{ 
        height: isVisible ? 'auto' : 0,
        marginTop: isVisible ? 16 : 0,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ 
        duration: isVisible ? 0.25 : 0.15, // Faster collapse, slightly slower expand
        ease: isVisible ? "easeOut" : "easeIn", // Different easing for expand vs collapse
        height: { duration: isVisible ? 0.25 : 0.15 },
        marginTop: { duration: isVisible ? 0.25 : 0.15 },
        opacity: { duration: isVisible ? 0.2 : 0.1 } // Very fast opacity change
      }}
      style={{ overflow: isVisible ? 'visible' : 'hidden' }}
    >
      <motion.div 
        className="bg-[#F5F5F5] rounded-12 p-3 cursor-pointer hover:bg-gray-200 transition-colors"
        onClick={(e) => handleCarSelectClick(e)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        animate={{ 
          scale: isVisible ? 1 : 0.95,
          y: isVisible ? 0 : -10
        }}
        transition={{ 
          duration: isVisible ? 0.2 : 0.1, // Faster scale/position change when collapsing
          ease: "easeOut" 
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-black">{currentCar ? currentCar.title : 'ค้นหายางตามรุ่นรถ'}</h3>
            <p className="text-sm text-gray-600">{currentCar ? currentCar.subtitle : 'โปรดเลือกรุ่นรถยนต์'}</p>
          </div>
          <div className="flex items-center space-x-2">
            {currentCar && (
              <motion.button 
                onClick={(e) => {
                  e.stopPropagation()
                  clearCar()
                }}
                className="p-2 hover:bg-gray-300 rounded-lg transition-colors"
                whileTap={{ scale: 0.95 }}
                title="ล้างการเลือกรถ"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </motion.button>
            )}
            <motion.button 
              className="p-2 hover:bg-gray-300 rounded-lg transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Settings2 className="w-5 h-5 text-black" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div 
            className="absolute top-full left-0 right-0 mt-2 bg-[#FFFFFF] border border-gray-200 rounded-12 shadow-lg z-50 max-h-96 overflow-hidden overflow-x-hidden md:hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
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

            <div className="max-h-64 overflow-y-auto">
              {filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                  <motion.div
                    key={car.id}
                    onClick={() => handleCarSelect(car)}
                    className={`p-4 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                      car.id === currentCar?.id 
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
                      {car.id === currentCar?.id && (
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
    </motion.div>
  )
}

export default CarSelectDesktop
