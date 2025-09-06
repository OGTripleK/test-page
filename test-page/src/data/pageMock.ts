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
    },
    {
      id: 'petlas-pt311-2',
      brand: 'Petlas',
      name: 'Petlas Elegant PT311 (ขวา)',
      image: '/images/petlas-pt311-2.png',
      rating: 4.7,
      reviews: 198,
      attributes: { comfort: 4, handling: 4, fuelEconomy: 3, durability: 4, noise: 4 },
      tags: ['Run Flat'],
      price: 2290,
      oldPrice: 2600,
      discountPercent: 12,
      currency: '฿',
    },
    {
      id: 'yokohama-adv-1',
      brand: 'Yokohama',
      name: 'Yokohama Premium Touring',
      image: '/images/yokohama-premium.png',
      rating: 4.6,
      reviews: 312,
      attributes: { comfort: 4, handling: 4, fuelEconomy: 4, durability: 4, noise: 3 },
      tags: ['รถ EV'],
      price: 2480,
      oldPrice: 2800,
      discountPercent: 11,
      currency: '฿',
    },
    {
      id: 'michelin-primacy-1',
      brand: 'Michelin',
      name: 'Michelin Primacy',
      image: '/images/michelin-primacy.png',
      rating: 4.9,
      reviews: 1024,
      attributes: { comfort: 5, handling: 5, fuelEconomy: 4, durability: 5, noise: 5 },
      tags: [],
      price: 4120,
      oldPrice: 4500,
      discountPercent: 8,
      currency: '฿',
    },
  ],
}

export default pageMock
