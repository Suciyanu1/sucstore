export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  subCategory: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  stock: number;
  isFeatured?: boolean;
  isNew?: boolean; 
  variants?: {
    type: 'size' | 'color';
    options: string[];
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subCategories: {
    name: string;
    slug: string;
  }[];
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://picsum.photos/seed/electronics/600/400',
    subCategories: [
      { name: 'Smartphones', slug: 'smartphones' },
      { name: 'Laptops', slug: 'laptops' },
      { name: 'Accessories', slug: 'accessories' }
    ]
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://picsum.photos/seed/fashion/600/400',
    subCategories: [
      { name: 'Men', slug: 'men' },
      { name: 'Women', slug: 'women' },
      { name: 'Shoes', slug: 'shoes' }
    ]
  },
  {
    id: '3',
    name: 'Home & Living',
    slug: 'home-living',
    image: 'https://picsum.photos/seed/home/600/400',
    subCategories: [
      { name: 'Furniture', slug: 'furniture' },
      { name: 'Decor', slug: 'decor' },
      { name: 'Kitchen', slug: 'kitchen' }
    ]
  },
  {
    id: '4',
    name: 'Phones',
    slug: 'phones',
    image: 'https://picsum.photos/seed/home/600/400',
    subCategories: [
      { name: 'Samsung', slug: 'samsung' },
      { name: 'Apple', slug: 'apple' },
      { name: 'Xiaomi', slug: 'xiaomi' }
    ]
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Premium Wireless Headphones',
    slug: 'premium-wireless-headphones',
    description: 'Experience studio-quality sound with our latest noise-canceling wireless headphones. Featuring 40-hour battery life and ultra-soft memory foam ear cups.',
    price: 299.99,
    oldPrice: 349.99,
    category: 'electronics',
    subCategory: 'accessories',
    images: [
      'https://picsum.photos/seed/headphones1/800/800',
      'https://picsum.photos/seed/headphones2/800/800'
    ],
    rating: 4.8,
    reviewsCount: 124,
    stock: 15,
    isFeatured: true,
    isNew: true,
    variants: [
      { type: 'color', options: ['Black', 'Silver', 'Midnight Blue'] }
    ]
  },
  {
    id: 'p2',
    name: 'Minimalist Leather Watch',
    slug: 'minimalist-leather-watch',
    description: 'A timeless piece for the modern individual. Genuine Italian leather strap paired with a scratch-resistant sapphire crystal face.',
    price: 189.00,
    category: 'fashion',
    subCategory: 'accessories',
    images: [
      'https://picsum.photos/seed/watch1/800/800',
      'https://picsum.photos/seed/watch2/800/800'
    ],
    rating: 4.5,
    reviewsCount: 89,
    stock: 24,
    isFeatured: true,
    variants: [
      { type: 'color', options: ['Brown', 'Black'] }
    ]
  },
  {
    id: 'p3',
    name: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    description: 'Work in comfort with our fully adjustable ergonomic chair. Features lumbar support, breathable mesh back, and 4D armrests.',
    price: 449.99,
    oldPrice: 599.99,
    category: 'home-living',
    subCategory: 'furniture',
    images: [
      'https://picsum.photos/seed/chair1/800/800'
    ],
    rating: 4.9,
    reviewsCount: 210,
    stock: 8,
    isFeatured: true
  },
  {
    id: 'p4',
    name: 'Ultra-Slim Laptop Pro',
    slug: 'ultra-slim-laptop-pro',
    description: 'Power meets portability. The new Laptop Pro features the latest M3 chip, 16GB RAM, and a stunning Liquid Retina display.',
    price: 1299.00,
    category: 'electronics',
    subCategory: 'laptops',
    images: [
      'https://picsum.photos/seed/laptop1/800/800'
    ],
    rating: 4.7,
    reviewsCount: 56,
    stock: 12,
    isNew: true
  },
  {
    id: 'p5',
    name: 'Cotton Oversized Tee',
    slug: 'cotton-oversized-tee',
    description: 'The perfect everyday essential. Made from 100% organic heavy-weight cotton for a premium feel and relaxed fit.',
    price: 45.00,
    category: 'fashion',
    subCategory: 'men',
    images: [
      'https://picsum.photos/seed/shirt1/800/800'
    ],
    rating: 4.3,
    reviewsCount: 156,
    stock: 100,
    variants: [
      { type: 'size', options: ['S', 'M', 'L', 'XL'] },
      { type: 'color', options: ['White', 'Black', 'Sage', 'Sand'] }
    ]
  },
  {
    id: 'p6',
    name: 'Smart Home Speaker',
    slug: 'smart-home-speaker',
    description: 'Control your entire home with your voice. Crystal clear audio and seamless integration with all your smart devices.',
    price: 129.99,
    oldPrice: 149.99,
    category: 'electronics',
    subCategory: 'accessories',
    images: [
      'https://picsum.photos/seed/speaker1/800/800'
    ],
    rating: 4.6,
    reviewsCount: 342,
    stock: 45
  }
];
