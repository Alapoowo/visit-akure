import type { ElementType } from 'react'
import { Hotel, Utensils, Building2, Briefcase, HeartPulse, ShoppingBag, Store, Calendar } from 'lucide-react'

export interface CategoryConfig {
  slug: string
  label: string
  icon: ElementType
  color: string
  bgColor: string
  accentHex: string
  hasPricing: boolean
  headline: string
  subcopy: string
}

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: 'hotels',
    label: 'Hotels',
    icon: Hotel,
    color: 'text-[#005F56]',
    bgColor: 'bg-[#e6f2f1]',
    accentHex: '#005F56',
    hasPricing: true,
    headline: 'Your Comfort Starts Here',
    subcopy: 'From cozy guesthouses to premium suites, find the perfect stay in Akure.',
  },
  {
    slug: 'foods',
    label: 'Foods',
    icon: Utensils,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    accentHex: '#ea580c',
    hasPricing: true,
    headline: 'Taste the Best of Akure',
    subcopy: 'Restaurants, cafés, and chop houses serving authentic Ondo flavours.',
  },
  {
    slug: 'shortlets',
    label: 'Shortlets',
    icon: Building2,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    accentHex: '#2563eb',
    hasPricing: true,
    headline: 'Feel at Home in Akure',
    subcopy: 'Fully furnished apartments and serviced flats for short-term stays.',
  },
  {
    slug: 'services',
    label: 'Services',
    icon: Briefcase,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    accentHex: '#9333ea',
    hasPricing: false,
    headline: 'Get Things Done',
    subcopy: 'Photographers, caterers, and skilled hands ready to serve you.',
  },
  {
    slug: 'health',
    label: 'Health',
    icon: HeartPulse,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    accentHex: '#ef4444',
    hasPricing: false,
    headline: 'Your Wellbeing, Our Priority',
    subcopy: 'Hospitals, clinics, pharmacies, and wellness centres near you.',
  },
  {
    slug: 'shops',
    label: 'Shops',
    icon: ShoppingBag,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    accentHex: '#d97706',
    hasPricing: false,
    headline: 'Shop Local, Shop Smart',
    subcopy: 'Boutiques, electronics, fashion, and everyday essentials in Akure.',
  },
  {
    slug: 'local-market',
    label: 'Local Market',
    icon: Store,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    accentHex: '#16a34a',
    hasPricing: false,
    headline: 'Fresh, Local, Authentic',
    subcopy: "Fresh produce, traditional crafts, and the best of Ondo's local markets.",
  },
  {
    slug: 'events',
    label: 'Events',
    icon: Calendar,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    accentHex: '#db2777',
    hasPricing: false,
    headline: 'Celebrate in Akure',
    subcopy: 'Festivals, concerts, tech summits and cultural celebrations.',
  },
]

export const PRICING_CATEGORIES = new Set(['hotels', 'foods', 'shortlets'])

export function getCategoryConfig(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find(c => c.slug === slug)
}

export function hasPricing(category: string): boolean {
  return PRICING_CATEGORIES.has(category)
}
