import { ShoppingBag } from 'lucide-react'
import CategoryPageLayout from '@/components/listings/CategoryPageLayout'
import { getProductsListings } from '@/data/listings'

export const metadata = {
  title: 'Products from Akure | Visit Akure',
  description: 'Shop authentic local products, crafts, foods and souvenirs from Akure, Ondo State.',
}

export default function ProductsPage() {
  const listings = getProductsListings()
  return (
    <CategoryPageLayout
      title="Products from Akure"
      subtitle="Authentic local crafts, foods and souvenirs"
      emoji="🛍️"
      category="products"
      listings={listings}
      icon={ShoppingBag}
      showSidebar={false}
    />
  )
}
