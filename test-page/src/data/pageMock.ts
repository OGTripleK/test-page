export type Tab = {
  id: string
  label: string
  count?: number
  active?: boolean
}

export type Filter = {
  id: string
  label: string
  options: string[]
}

export type GuideCard = {
  id: string
  author: string
  role?: string
  avatar?: string
  message: string
  ctaLabel?: string
}

export type TireProduct = {
  id: string
  brand: string
  name: string
  image?: string
  rating: number
  reviews: number
  attributes: {
    comfort?: number
    handling?: number
    fuelEconomy?: number
    durability?: number
    noise?: number
  }
  tags?: string[]
  price: number
  oldPrice?: number
  discountPercent?: number
  currency?: string
  compatibleTireSize: string
  isPopular?: boolean
}

export type PageMock = {
  tabs: Tab[]
  filters: Filter[]
  guide: GuideCard
  products: TireProduct[]
}

export const pageMock: PageMock = {
  tabs: [
    { id: 'all', label: 'ทั้งหมด', count: 7, active: true },
    { id: 'popular', label: 'ยอดนิยม' },
    { id: 'price_low_high', label: 'ราคา: ต่ำ ไป สูง' },
    { id: 'price_high_low', label: 'ราคา: สูง ไป ต่ำ' },
  ],
  filters: [
    { id: 'brand', label: 'ยี่ห้อยาง', options: ['ทั้งหมด', 'Yokohama', 'Michelin', 'Petlas'] },
    { id: 'price', label: 'ราคา', options: ['ทั้งหมด', '0-1,000', '1,000-2,000', '2,000+'] },
    { id: 'feature', label: 'คุณสมบัติ', options: ['ทั้งหมด', 'Run Flat', 'รถ EV', 'ประหยัดน้ำมัน'] },
  ],
  guide: {
    id: 'guide-22',
    author: '22 Guide',
    role: 'ผู้เชี่ยวชาญ',
    avatar: '/images/guide-avatar.png',
    message:
      'จากรีวิวของลูกค้า แนะนำว่าสำหรับรถ Honda Accord คนส่วนใหญ่จะเลือกใช้ยาง Michelin เพราะมีคุณสมบัติเงียบมาก ขับทางไกลแทบไม่ได้ยินเสียงยางเลย เกาะถนนดี แม้ฝนตกก็ยังรู้สึกมั่นใจ ตอนนี้ใช้มา 15,000 กม. ยังนุ่มเหมือนเดิม แต่ถ้าหากอยากได้ความคุ้มค่า แนะนำยาง Yokohama ครับ',
    ctaLabel: 'ปรึกษาผู้เชี่ยวชาญ',
  },
  products: [
    // Products for Honda Accord 2025 - 225/50R17
    {
      id: 'petlas-pt311-1',
      brand: 'Petlas',
      name: 'Petlas Elegant PT311',
      image: '/images/petlas-pt311.png',
      rating: 4.8,
      reviews: 423,
      attributes: { comfort: 4, handling: 4, fuelEconomy: 4, durability: 4, noise: 4 },
      tags: ['รถ EV', 'Run Flat'],
      price: 2340,
      oldPrice: 2750,
      discountPercent: 15,
      currency: '฿',
      compatibleTireSize: '225/50R17',
      isPopular: true,
    },
    {
      id: 'michelin-primacy-1',
      brand: 'Michelin',
      name: 'Michelin Primacy 4',
      image: '/images/michelin-primacy.png',
      rating: 4.9,
      reviews: 1024,
      attributes: { comfort: 5, handling: 5, fuelEconomy: 4, durability: 5, noise: 5 },
      tags: ['รถ EV', 'ประหยัดน้ำมัน', 'Run Flat'],
      price: 4120,
      oldPrice: 4500,
      discountPercent: 8,
      currency: '฿',
      compatibleTireSize: '225/50R17',
      isPopular: true,
    },
    {
      id: 'yokohama-adv-1',
      brand: 'Yokohama',
      name: 'Yokohama BluEarth GT AE51',
      image: '/images/yokohama-premium.png',
      rating: 4.6,
      reviews: 312,
      attributes: { comfort: 4, handling: 4, fuelEconomy: 4, durability: 4, noise: 3 },
      tags: ['รถ EV'],
      price: 2480,
      oldPrice: 2800,
      discountPercent: 11,
      currency: '฿',
      compatibleTireSize: '225/50R17',
      isPopular: false,
    },
    {
      id: 'bridgestone-turanza-1',
      brand: 'Bridgestone',
      name: 'Bridgestone Turanza T005A',
      image: '/images/bridgestone-turanza.png',
      rating: 4.7,
      reviews: 567,
      attributes: { comfort: 4, handling: 4, fuelEconomy: 5, durability: 4, noise: 4 },
      tags: ['ประหยัดน้ำมัน'],
      price: 3200,
      oldPrice: 3600,
      discountPercent: 11,
      currency: '฿',
      compatibleTireSize: '225/50R17',
      isPopular: false,
    },
    {
      id: 'continental-premium-1',
      brand: 'Continental',
      name: 'Continental PremiumContact 6',
      image: '/images/continental-premium.png',
      rating: 4.8,
      reviews: 789,
      attributes: { comfort: 5, handling: 5, fuelEconomy: 4, durability: 4, noise: 4 },
      tags: ['Run Flat'],
      price: 3850,
      oldPrice: 4200,
      discountPercent: 8,
      currency: '฿',
      compatibleTireSize: '225/50R17',
      isPopular: true,
    },
    
    // Products for Toyota Corolla 2020 - 195/65R15
    {
      id: 'petlas-pt311-corolla',
      brand: 'Petlas',
      name: 'Petlas Elegant PT311',
      image: '/images/petlas-pt311.png',
      rating: 4.6,
      reviews: 234,
      attributes: { comfort: 4, handling: 4, fuelEconomy: 4, durability: 4, noise: 4 },
      tags: [],
      price: 1890,
      oldPrice: 2200,
      discountPercent: 14,
      currency: '฿',
      compatibleTireSize: '195/65R15',
      isPopular: true,
    },
    {
      id: 'michelin-energy-corolla',
      brand: 'Michelin',
      name: 'Michelin Energy XM2+',
      image: '/images/michelin-energy.png',
      rating: 4.8,
      reviews: 687,
      attributes: { comfort: 5, handling: 4, fuelEconomy: 5, durability: 5, noise: 4 },
      tags: ['ประหยัดน้ำมัน'],
      price: 2650,
      oldPrice: 2900,
      discountPercent: 9,
      currency: '฿',
      compatibleTireSize: '195/65R15',
      isPopular: true,
    },
    {
      id: 'yokohama-bluearth-corolla',
      brand: 'Yokohama',
      name: 'Yokohama BluEarth AE-01',
      image: '/images/yokohama-bluearth.png',
      rating: 4.5,
      reviews: 345,
      attributes: { comfort: 4, handling: 4, fuelEconomy: 5, durability: 4, noise: 3 },
      tags: ['ประหยัดน้ำมัน'],
      price: 2150,
      oldPrice: 2400,
      discountPercent: 10,
      currency: '฿',
      compatibleTireSize: '195/65R15',
      isPopular: false,
    },
    
    // Products for BMW 3 Series 2019 - 225/45R18
    {
      id: 'michelin-pilot-bmw',
      brand: 'Michelin',
      name: 'Michelin Pilot Sport 4',
      image: '/images/michelin-pilot.png',
      rating: 4.9,
      reviews: 1456,
      attributes: { comfort: 4, handling: 5, fuelEconomy: 3, durability: 4, noise: 4 },
      tags: ['Performance'],
      price: 5200,
      oldPrice: 5800,
      discountPercent: 10,
      currency: '฿',
      compatibleTireSize: '225/45R18',
      isPopular: true,
    },
    {
      id: 'continental-sport-bmw',
      brand: 'Continental',
      name: 'Continental SportContact 6',
      image: '/images/continental-sport.png',
      rating: 4.8,
      reviews: 892,
      attributes: { comfort: 4, handling: 5, fuelEconomy: 3, durability: 4, noise: 3 },
      tags: ['Performance'],
      price: 4650,
      oldPrice: 5100,
      discountPercent: 9,
      currency: '฿',
      compatibleTireSize: '225/45R18',
      isPopular: true,
    },
    {
      id: 'bridgestone-potenza-bmw',
      brand: 'Bridgestone',
      name: 'Bridgestone Potenza S001',
      image: '/images/bridgestone-potenza.png',
      rating: 4.7,
      reviews: 634,
      attributes: { comfort: 3, handling: 5, fuelEconomy: 3, durability: 4, noise: 3 },
      tags: ['Performance'],
      price: 4100,
      oldPrice: 4500,
      discountPercent: 9,
      currency: '฿',
      compatibleTireSize: '225/45R18',
      isPopular: false,
    },
    
    // Products for Tesla Model 3 2022 - 235/45R18
    {
      id: 'michelin-pilot-tesla',
      brand: 'Michelin',
      name: 'Michelin Pilot Sport EV',
      image: '/images/michelin-pilot-ev.png',
      rating: 4.9,
      reviews: 723,
      attributes: { comfort: 5, handling: 5, fuelEconomy: 5, durability: 5, noise: 5 },
      tags: ['รถ EV', 'Performance'],
      price: 6200,
      oldPrice: 6800,
      discountPercent: 9,
      currency: '฿',
      compatibleTireSize: '235/45R18',
      isPopular: true,
    },
    {
      id: 'continental-eco-tesla',
      brand: 'Continental',
      name: 'Continental EcoContact 6',
      image: '/images/continental-eco.png',
      rating: 4.7,
      reviews: 456,
      attributes: { comfort: 4, handling: 4, fuelEconomy: 5, durability: 4, noise: 4 },
      tags: ['รถ EV', 'ประหยัดน้ำมัน'],
      price: 4800,
      oldPrice: 5200,
      discountPercent: 8,
      currency: '฿',
      compatibleTireSize: '235/45R18',
      isPopular: true,
    },
    
    // Products for Honda Civic 2018 - 215/55R16
    {
      id: 'yokohama-bluearth-civic',
      brand: 'Yokohama',
      name: 'Yokohama BluEarth GT AE51',
      image: '/images/yokohama-bluearth-civic.png',
      rating: 4.6,
      reviews: 467,
      attributes: { comfort: 4, handling: 4, fuelEconomy: 4, durability: 4, noise: 4 },
      tags: [],
      price: 2340,
      oldPrice: 2600,
      discountPercent: 10,
      currency: '฿',
      compatibleTireSize: '215/55R16',
      isPopular: true,
    },
    {
      id: 'michelin-primacy-civic',
      brand: 'Michelin',
      name: 'Michelin Primacy 4',
      image: '/images/michelin-primacy-civic.png',
      rating: 4.8,
      reviews: 623,
      attributes: { comfort: 5, handling: 4, fuelEconomy: 4, durability: 5, noise: 5 },
      tags: [],
      price: 3200,
      oldPrice: 3500,
      discountPercent: 9,
      currency: '฿',
      compatibleTireSize: '215/55R16',
      isPopular: true,
    },
    
    // Products for Mazda CX-5 2021 - 225/55R19
    {
      id: 'michelin-latitude-cx5',
      brand: 'Michelin',
      name: 'Michelin Latitude Tour HP',
      image: '/images/michelin-latitude.png',
      rating: 4.7,
      reviews: 543,
      attributes: { comfort: 4, handling: 4, fuelEconomy: 4, durability: 5, noise: 4 },
      tags: ['SUV'],
      price: 4650,
      oldPrice: 5100,
      discountPercent: 9,
      currency: '฿',
      compatibleTireSize: '225/55R19',
      isPopular: true,
    },
    {
      id: 'bridgestone-dueler-cx5',
      brand: 'Bridgestone',
      name: 'Bridgestone Dueler H/P Sport',
      image: '/images/bridgestone-dueler.png',
      rating: 4.6,
      reviews: 398,
      attributes: { comfort: 4, handling: 4, fuelEconomy: 4, durability: 4, noise: 3 },
      tags: ['SUV'],
      price: 3890,
      oldPrice: 4200,
      discountPercent: 7,
      currency: '฿',
      compatibleTireSize: '225/55R19',
      isPopular: false,
    },
    
    // Products for Nissan Navara 2017 - 265/60R18
    {
      id: 'bridgestone-dueler-navara',
      brand: 'Bridgestone',
      name: 'Bridgestone Dueler A/T 697',
      image: '/images/bridgestone-at.png',
      rating: 4.5,
      reviews: 612,
      attributes: { comfort: 3, handling: 4, fuelEconomy: 3, durability: 5, noise: 3 },
      tags: ['All Terrain', 'Pickup'],
      price: 4200,
      oldPrice: 4600,
      discountPercent: 9,
      currency: '฿',
      compatibleTireSize: '265/60R18',
      isPopular: true,
    },
    {
      id: 'yokohama-geolandar-navara',
      brand: 'Yokohama',
      name: 'Yokohama Geolandar A/T G015',
      image: '/images/yokohama-geolandar.png',
      rating: 4.6,
      reviews: 423,
      attributes: { comfort: 3, handling: 4, fuelEconomy: 3, durability: 5, noise: 3 },
      tags: ['All Terrain', 'Pickup'],
      price: 3950,
      oldPrice: 4300,
      discountPercent: 8,
      currency: '฿',
      compatibleTireSize: '265/60R18',
      isPopular: true,
    },
    
    // Products for Toyota Camry Hybrid 2024 - 215/55R17
    {
      id: 'michelin-energy-camry',
      brand: 'Michelin',
      name: 'Michelin Energy XM2+',
      image: '/images/michelin-energy-camry.png',
      rating: 4.8,
      reviews: 789,
      attributes: { comfort: 5, handling: 4, fuelEconomy: 5, durability: 5, noise: 4 },
      tags: ['Hybrid', 'ประหยัดน้ำมัน'],
      price: 3200,
      oldPrice: 3500,
      discountPercent: 9,
      currency: '฿',
      compatibleTireSize: '215/55R17',
      isPopular: true,
    },
    {
      id: 'bridgestone-ecopia-camry',
      brand: 'Bridgestone',
      name: 'Bridgestone Ecopia EP300',
      image: '/images/bridgestone-ecopia.png',
      rating: 4.6,
      reviews: 456,
      attributes: { comfort: 4, handling: 4, fuelEconomy: 5, durability: 4, noise: 4 },
      tags: ['Hybrid', 'ประหยัดน้ำมัน'],
      price: 2850,
      oldPrice: 3100,
      discountPercent: 8,
      currency: '฿',
      compatibleTireSize: '215/55R17',
      isPopular: true,
    },
    
    // Products for Ford Ranger Wildtrak 2016 - 265/65R17
    {
      id: 'bridgestone-dueler-ranger',
      brand: 'Bridgestone',
      name: 'Bridgestone Dueler H/T 684II',
      image: '/images/bridgestone-ht.png',
      rating: 4.4,
      reviews: 534,
      attributes: { comfort: 4, handling: 3, fuelEconomy: 4, durability: 5, noise: 3 },
      tags: ['Highway Terrain', 'Pickup'],
      price: 3650,
      oldPrice: 4000,
      discountPercent: 9,
      currency: '฿',
      compatibleTireSize: '265/65R17',
      isPopular: true,
    },
    {
      id: 'yokohama-geolandar-ranger',
      brand: 'Yokohama',
      name: 'Yokohama Geolandar H/T G056',
      image: '/images/yokohama-ht.png',
      rating: 4.5,
      reviews: 367,
      attributes: { comfort: 4, handling: 3, fuelEconomy: 4, durability: 5, noise: 3 },
      tags: ['Highway Terrain', 'Pickup'],
      price: 3400,
      oldPrice: 3700,
      discountPercent: 8,
      currency: '฿',
      compatibleTireSize: '265/65R17',
      isPopular: false,
    },
    
    // Products for Mercedes-Benz C200 2023 - 225/50R17  
    {
      id: 'continental-premium-c200',
      brand: 'Continental',
      name: 'Continental PremiumContact 6',
      image: '/images/continental-premium-c200.png',
      rating: 4.9,
      reviews: 923,
      attributes: { comfort: 5, handling: 5, fuelEconomy: 4, durability: 4, noise: 5 },
      tags: ['Premium', 'Run Flat'],
      price: 4850,
      oldPrice: 5300,
      discountPercent: 8,
      currency: '฿',
      compatibleTireSize: '225/50R17',
      isPopular: true,
    },
    {
      id: 'michelin-primacy-c200',
      brand: 'Michelin',
      name: 'Michelin Primacy 4 ST',
      image: '/images/michelin-primacy-c200.png',
      rating: 4.8,
      reviews: 756,
      attributes: { comfort: 5, handling: 5, fuelEconomy: 4, durability: 5, noise: 5 },
      tags: ['Premium'],
      price: 4200,
      oldPrice: 4600,
      discountPercent: 9,
      currency: '฿',
      compatibleTireSize: '225/50R17',
      isPopular: true,
    },
  ],
}

export default pageMock
