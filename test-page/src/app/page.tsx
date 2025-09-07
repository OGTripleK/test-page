'use client'

import Navbar from '../components/Navbar'
import Products from '../components/Products'
import { CarSelectProvider, useCarSelect } from '../components/CarSelect'
import { FilterBarProvider } from '../components/FilterBar'
import { pageMock } from '../data/pageMock'

function PageContent() {
  const { currentCar } = useCarSelect()
  
  return (
    <FilterBarProvider products={pageMock.products} selectedCar={currentCar}>
      <Navbar />
      <Products />
    </FilterBarProvider>
  )
}

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <CarSelectProvider>
        <PageContent />
      </CarSelectProvider>
    </div>
  );
}

