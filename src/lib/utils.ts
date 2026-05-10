import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return '₦' + price.toLocaleString('en-NG')
}

export function getWhatsAppLink(phone: string, title: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const message = encodeURIComponent(
    `Hi, I saw "${title}" on Visit Akure and I'm interested. Can you share more details?`
  )
  return `https://wa.me/${cleaned}?text=${message}`
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    stays: '🏨',
    cars: '🚗',
    activities: '🎭',
    events: '📅',
    services: '🛎️',
    products: '🛍️',
  }
  return map[category] ?? '📦'
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 30) return `${diffDays} days ago`
  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`
  return `${Math.floor(diffMonths / 12)} year${Math.floor(diffMonths / 12) > 1 ? 's' : ''} ago`
}
