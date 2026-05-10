export type Category = 'stays' | 'cars' | 'activities' | 'events' | 'services' | 'products'

export interface Listing {
  id: string
  title: string
  category: Category
  description: string
  price: number
  priceUnit: string
  location: string
  whatsappNumber: string
  images: string[]
  amenities: string[]
  isFeatured: boolean
  isApproved: boolean
  rating: number
  reviewCount: number
  vendorId: string
  vendor?: Vendor
  reviews?: Review[]
  // Category-specific fields
  specs?: Record<string, string>
  createdAt: string
}

export interface Vendor {
  id: string
  businessName: string
  plan: 'basic' | 'verified' | 'featured'
  isVerified: boolean
  avatar?: string
  responseRate?: number
  responseTime?: string
  whatsappClicks?: number
}

export interface Review {
  id: string
  listingId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  createdAt: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'vendor' | 'admin'
}

export interface FilterState {
  priceMin: number
  priceMax: number
  location: string
  featured: boolean
  sortBy: 'popular' | 'price_asc' | 'price_desc' | 'newest' | 'rating'
  tags: string[]
}
