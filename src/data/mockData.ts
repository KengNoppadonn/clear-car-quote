import promoEvImage from "@/assets/promo-ev.jpg";
import promoInstallmentImage from "@/assets/promo-installment.jpg";
import articleGuideImage from "@/assets/article-guide.jpg";

export interface CarBrand {
  id: string;
  name: string;
  logoUrl: string;
  popular: boolean;
}

export interface CarModel {
  id: string;
  brandId: string;
  name: string;
  yearFrom: number;
  yearTo: number;
}

export interface Insurer {
  id: string;
  name: string;
  logoUrl: string;
  rating?: number;
}

export interface Coverage {
  ownDamage?: number;
  tpProperty?: number;
  tpBodilyPerPerson?: number;
  tpBodilyPerEvent?: number;
  theft?: boolean;
  fire?: boolean;
  flood?: boolean;
  pa?: number;
  me?: number;
  bail?: number;
}

export interface Plan {
  id: string;
  insurerId: string;
  name: string;
  class: '1' | '2+' | '3+' | '2' | '3';
  repairType: 'ศูนย์' | 'อู่';
  deductible: number;
  coverage: Coverage;
}

export interface Offer {
  id: string;
  planId: string;
  modelId: string;
  year: number;
  annualPremium: number;
  installmentAvailable: boolean;
  badges: string[];
  popularity: number;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  expiresAt: Date;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  content: string;
  tags: string[];
}

// Mock data
export const carBrands: CarBrand[] = [
  { id: '1', name: 'TOYOTA', logoUrl: '/api/placeholder/80/40', popular: true },
  { id: '2', name: 'HONDA', logoUrl: '/api/placeholder/80/40', popular: true },
  { id: '3', name: 'ISUZU', logoUrl: '/api/placeholder/80/40', popular: true },
  { id: '4', name: 'MAZDA', logoUrl: '/api/placeholder/80/40', popular: true },
  { id: '5', name: 'NISSAN', logoUrl: '/api/placeholder/80/40', popular: true },
  { id: '6', name: 'MITSUBISHI', logoUrl: '/api/placeholder/80/40', popular: true },
  { id: '7', name: 'MG', logoUrl: '/api/placeholder/80/40', popular: false },
  { id: '8', name: 'BYD', logoUrl: '/api/placeholder/80/40', popular: false },
];

export const carModels: CarModel[] = [
  { id: '1', brandId: '1', name: 'YARIS', yearFrom: 2018, yearTo: 2024 },
  { id: '2', brandId: '1', name: 'VIOS', yearFrom: 2018, yearTo: 2024 },
  { id: '3', brandId: '1', name: 'CAMRY', yearFrom: 2018, yearTo: 2024 },
  { id: '4', brandId: '1', name: 'HILUX REVO', yearFrom: 2018, yearTo: 2024 },
  { id: '5', brandId: '2', name: 'CITY', yearFrom: 2018, yearTo: 2024 },
  { id: '6', brandId: '2', name: 'CIVIC', yearFrom: 2018, yearTo: 2024 },
  { id: '7', brandId: '2', name: 'ACCORD', yearFrom: 2018, yearTo: 2024 },
  { id: '8', brandId: '2', name: 'CR-V', yearFrom: 2018, yearTo: 2024 },
  { id: '9', brandId: '3', name: 'D-MAX', yearFrom: 2018, yearTo: 2024 },
  { id: '10', brandId: '3', name: 'MU-X', yearFrom: 2018, yearTo: 2024 },
  { id: '11', brandId: '4', name: 'MAZDA 2', yearFrom: 2018, yearTo: 2024 },
  { id: '12', brandId: '4', name: 'MAZDA 3', yearFrom: 2018, yearTo: 2024 },
  { id: '13', brandId: '8', name: 'ATTO 3', yearFrom: 2022, yearTo: 2024 },
  { id: '14', brandId: '8', name: 'DOLPHIN', yearFrom: 2023, yearTo: 2024 },
  { id: '15', brandId: '7', name: 'MG4', yearFrom: 2022, yearTo: 2024 },
];

export const insurers: Insurer[] = [
  { id: '1', name: 'วิริยะประกันภัย', logoUrl: '/api/placeholder/60/30', rating: 4.5 },
  { id: '2', name: 'กรุงเทพประกันภัย', logoUrl: '/api/placeholder/60/30', rating: 4.3 },
  { id: '3', name: 'ไทยวิวัฒน์ประกันภัย', logoUrl: '/api/placeholder/60/30', rating: 4.2 },
  { id: '4', name: 'เมืองไทยประกันภัย', logoUrl: '/api/placeholder/60/30', rating: 4.4 },
  { id: '5', name: 'แอลเอ็มจี ประกันภัย', logoUrl: '/api/placeholder/60/30', rating: 4.1 },
  { id: '6', name: 'เอไอเอ ประกันภัย', logoUrl: '/api/placeholder/60/30', rating: 4.6 },
  { id: '7', name: 'ทิพยประกันภัย', logoUrl: '/api/placeholder/60/30', rating: 4.0 },
  { id: '8', name: 'ชัลลว์ประกันภัย', logoUrl: '/api/placeholder/60/30', rating: 4.2 },
];

export const plans: Plan[] = [
  {
    id: '1',
    insurerId: '1',
    name: 'ประกันชั้น 1',
    class: '1',
    repairType: 'ศูนย์',
    deductible: 0,
    coverage: {
      ownDamage: 500000,
      tpProperty: 1000000,
      tpBodilyPerPerson: 200000,
      tpBodilyPerEvent: 10000000,
      theft: true,
      fire: true,
      flood: true,
      pa: 100000,
      me: 50000,
      bail: 200000,
    },
  },
  {
    id: '2',
    insurerId: '2',
    name: 'ประกันชั้น 2+',
    class: '2+',
    repairType: 'ศูนย์',
    deductible: 0,
    coverage: {
      ownDamage: 300000,
      tpProperty: 1000000,
      tpBodilyPerPerson: 200000,
      tpBodilyPerEvent: 10000000,
      theft: true,
      fire: true,
      flood: false,
      pa: 100000,
      me: 50000,
      bail: 200000,
    },
  },
  {
    id: '3',
    insurerId: '3',
    name: 'ประกันชั้น 3+',
    class: '3+',
    repairType: 'อู่',
    deductible: 5000,
    coverage: {
      ownDamage: 200000,
      tpProperty: 1000000,
      tpBodilyPerPerson: 200000,
      tpBodilyPerEvent: 10000000,
      theft: false,
      fire: true,
      flood: false,
      pa: 100000,
      me: 50000,
      bail: 200000,
    },
  },
];

export const sampleOffers: Offer[] = [
  {
    id: '1',
    planId: '1',
    modelId: '1', // YARIS
    year: 2023,
    annualPremium: 15900,
    installmentAvailable: true,
    badges: ['Best Price', 'ผ่อนได้'],
    popularity: 95,
  },
  {
    id: '2',
    planId: '2',
    modelId: '1', // YARIS
    year: 2023,
    annualPremium: 12500,
    installmentAvailable: true,
    badges: ['โปรพิเศษ', 'ผ่อนได้'],
    popularity: 88,
  },
  {
    id: '3',
    planId: '3',
    modelId: '1', // YARIS
    year: 2023,
    annualPremium: 8900,
    installmentAvailable: false,
    badges: ['ราคาดี'],
    popularity: 75,
  },
  {
    id: '4',
    planId: '1',
    modelId: '5', // CITY
    year: 2023,
    annualPremium: 16900,
    installmentAvailable: true,
    badges: ['Best Price', 'ผ่อนได้'],
    popularity: 92,
  },
  {
    id: '5',
    planId: '2',
    modelId: '5', // CITY
    year: 2023,
    annualPremium: 13500,
    installmentAvailable: true,
    badges: ['ยอดนิยม', 'ผ่อนได้'],
    popularity: 85,
  },
  {
    id: '6',
    planId: '1',
    modelId: '9', // D-MAX
    year: 2023,
    annualPremium: 18900,
    installmentAvailable: true,
    badges: ['Best Price', 'ผ่อนได้'],
    popularity: 78,
  },
  {
    id: '7',
    planId: '1',
    modelId: '13', // ATTO 3
    year: 2023,
    annualPremium: 22900,
    installmentAvailable: true,
    badges: ['EV Special', 'ลดเบี้ย 15%'],
    popularity: 90,
  },
  {
    id: '8',
    planId: '2',
    modelId: '11', // MAZDA 2
    year: 2023,
    annualPremium: 11900,
    installmentAvailable: true,
    badges: ['โปรพิเศษ', 'ผ่อนได้'],
    popularity: 82,
  },
  {
    id: '9',
    planId: '1',
    modelId: '4', // HILUX REVO
    year: 2023,
    annualPremium: 19900,
    installmentAvailable: true,
    badges: ['Best Price', 'ผ่อนได้'],
    popularity: 88,
  },
];

export const promotions: Promotion[] = [
  {
    id: '1',
    title: 'ประกันรถยนต์ไฟฟ้า ลดเบี้ย 20%',
    description: 'สำหรับรถยนต์ไฟฟ้าทุกรุ่น รับส่วนลดพิเศษ',
    imageUrl: promoEvImage,
    expiresAt: new Date('2024-12-31'),
  },
  {
    id: '2',
    title: 'ผ่อน 0% นาน 10 เดือน',
    description: 'ผ่อนชำระเบี้ยประกันรถยนต์ดอกเบี้ย 0%',
    imageUrl: promoInstallmentImage,
    expiresAt: new Date('2024-11-30'),
  },
  {
    id: '3',
    title: 'ประกันชั้น 1 ราคาพิเศษ',
    description: 'เริ่มต้นเพียง 12,900 บาท/ปี',
    imageUrl: '/api/placeholder/400/200',
    expiresAt: new Date('2024-10-31'),
  },
  {
    id: '4',
    title: 'รับ Voucher เชื้อเพลิง',
    description: 'ซื้อประกันรถยนต์วันนี้ รับ Voucher PTT 500 บาท',
    imageUrl: '/api/placeholder/400/200',
    expiresAt: new Date('2024-09-30'),
  },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'วิธีเลือกประกันรถยนต์ให้เหมาะกับความต้องการ',
    slug: 'how-to-choose-car-insurance',
    excerpt: 'เทคนิคการเลือกประกันรถยนต์ที่เหมาะสมกับไลฟ์สไตล์และงบประมาณของคุณ',
    imageUrl: articleGuideImage,
    content: 'เนื้อหาบทความ...',
    tags: ['ประกันรถยนต์', 'คำแนะนำ'],
  },
  {
    id: '2',
    title: 'ความแตกต่างระหว่างประกันชั้น 1, 2+, 3+',
    slug: 'car-insurance-classes-explained',
    excerpt: 'ทำความเข้าใจความแตกต่างและความคุ้มครองของประกันรถยนต์แต่ละชั้น',
    imageUrl: '/api/placeholder/300/200',
    content: 'เนื้อหาบทความ...',
    tags: ['ประกันรถยนต์', 'ความรู้'],
  },
  {
    id: '3',
    title: 'ประกันรถยนต์ไฟฟ้า มีอะไรต่างจากรถน้ำมัน?',
    slug: 'ev-car-insurance-differences',
    excerpt: 'สิ่งที่ควรรู้เกี่ยวกับประกันรถยนต์ไฟฟ้าและข้อดีที่คุณจะได้รับ',
    imageUrl: '/api/placeholder/300/200',
    content: 'เนื้อหาบทความ...',
    tags: ['ประกันรถยนต์', 'รถยนต์ไฟฟ้า'],
  },
  {
    id: '4',
    title: 'เคล็ดลับประหยัดเบี้ยประกัน ไม่ลดความคุ้มครอง',
    slug: 'save-insurance-premium',
    excerpt: 'วิธีการลดค่าเบี้ยประกันรถยนต์แต่ยังคงได้รับความคุ้มครองที่ดี',
    imageUrl: '/api/placeholder/300/200',
    content: 'เนื้อหาบทความ...',
    tags: ['ประกันรถยนต์', 'เงินทอง'],
  },
  {
    id: '5',
    title: 'วิธีเคลมประกันรถยนต์อย่างถูกต้อง',
    slug: 'car-insurance-claim-guide',
    excerpt: 'ขั้นตอนการเคลมประกันรถยนต์ เอกสารที่ต้องเตรียม และข้อควรระวัง',
    imageUrl: '/api/placeholder/300/200',
    content: 'เนื้อหาบทความ...',
    tags: ['ประกันรถยนต์', 'เคลม'],
  },
  {
    id: '6',
    title: 'ประกันรถใหม่ vs รถมือสอง ต่างกันอย่างไร?',
    slug: 'new-vs-used-car-insurance',
    excerpt: 'เปรียบเทียบประกันรถยนต์สำหรับรถใหม่และรถมือสอง',
    imageUrl: '/api/placeholder/300/200',
    content: 'เนื้อหาบทความ...',
    tags: ['ประกันรถยนต์', 'รถมือสอง'],
  },
];