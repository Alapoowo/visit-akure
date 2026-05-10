import { NextRequest, NextResponse } from 'next/server'
import { allListings } from '@/data/listings'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.toLowerCase() ?? ''
  const category = searchParams.get('category')
  const featured = searchParams.get('featured') === 'true'
  const minPrice = Number(searchParams.get('minPrice') ?? 0)
  const maxPrice = Number(searchParams.get('maxPrice') ?? Infinity)
  const limit = Number(searchParams.get('limit') ?? 20)

  let results = allListings.filter(l => l.isApproved)

  if (category) results = results.filter(l => l.category === category)
  if (featured) results = results.filter(l => l.isFeatured)
  if (minPrice) results = results.filter(l => l.price >= minPrice)
  if (maxPrice < Infinity) results = results.filter(l => l.price <= maxPrice)

  if (q) {
    results = results.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.location.toLowerCase().includes(q) ||
      l.amenities.some(a => a.toLowerCase().includes(q))
    )
  }

  // Sort: featured first, then by rating
  results.sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1
    if (!a.isFeatured && b.isFeatured) return 1
    return b.rating - a.rating
  })

  return NextResponse.json({
    results: results.slice(0, limit),
    total: results.length,
    query: q,
    category,
  })
}
