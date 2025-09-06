export type CarSelection = {
  id?: string
  title: string
  make?: string
  model?: string
  trim?: string
  subtitle?: string
  year?: number
  tireSize?: string
  color?: string
  mileageKm?: number
  selected?: boolean
}

export const carOptions: CarSelection[] = [
  { id: 'car-1', title: '2025 Honda Accord EX', make: 'Honda', model: 'Accord', trim: 'EX', subtitle: 'ขนาดยาง 225/50R17', year: 2025, tireSize: '225/50R17', color: 'Modern Steel Metallic', mileageKm: 15000 },
  { id: 'car-2', title: '2020 Toyota Corolla G', make: 'Toyota', model: 'Corolla', trim: 'G', subtitle: 'ขนาดยาง 195/65R15', year: 2020, tireSize: '195/65R15', color: 'White', mileageKm: 42000 },
  { id: 'car-3', title: '2019 BMW 3 Series 330i', make: 'BMW', model: '3 Series', trim: '330i', subtitle: 'ขนาดยาง 225/45R18', year: 2019, tireSize: '225/45R18', color: 'Alpine White', mileageKm: 68000 },
  { id: 'car-4', title: '2022 Tesla Model 3 Standard', make: 'Tesla', model: 'Model 3', trim: 'Standard', subtitle: 'ขนาดยาง 235/45R18', year: 2022, tireSize: '235/45R18', color: 'Black', mileageKm: 12000 },
  { id: 'car-5', title: '2018 Honda Civic RS', make: 'Honda', model: 'Civic', trim: 'RS', subtitle: 'ขนาดยาง 215/55R16', year: 2018, tireSize: '215/55R16', color: 'Blue', mileageKm: 85000 },
  { id: 'car-6', title: '2021 Mazda CX-5 SP', make: 'Mazda', model: 'CX-5', trim: 'SP', subtitle: 'ขนาดยาง 225/55R19', year: 2021, tireSize: '225/55R19', color: 'Soul Red', mileageKm: 30000 },
  { id: 'car-7', title: '2017 Nissan Navara PRO-4X', make: 'Nissan', model: 'Navara', trim: 'PRO-4X', subtitle: 'ขนาดยาง 265/60R18', year: 2017, tireSize: '265/60R18', color: 'Gray', mileageKm: 110000 },
  { id: 'car-8', title: '2024 Toyota Camry Hybrid', make: 'Toyota', model: 'Camry', trim: 'Hybrid', subtitle: 'ขนาดยาง 215/55R17', year: 2024, tireSize: '215/55R17', color: 'Silver', mileageKm: 5000 },
  { id: 'car-9', title: '2016 Ford Ranger Wildtrak', make: 'Ford', model: 'Ranger', trim: 'Wildtrak', subtitle: 'ขนาดยาง 265/65R17', year: 2016, tireSize: '265/65R17', color: 'Orange', mileageKm: 140000 },
  { id: 'car-10', title: '2023 Mercedes-Benz C200', make: 'Mercedes-Benz', model: 'C-Class', trim: 'C200', subtitle: 'ขนาดยาง 225/50R17', year: 2023, tireSize: '225/50R17', color: 'Black', mileageKm: 8000 },
]
