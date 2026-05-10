'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface WishlistContextValue {
  saved: Set<string>
  toggle: (id: string) => boolean
  isSaved: (id: string) => boolean
  count: number
}

const WishlistContext = createContext<WishlistContextValue>({
  saved: new Set(),
  toggle: () => false,
  isSaved: () => false,
  count: 0,
})

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<Set<string>>(new Set())

  const toggle = (id: string): boolean => {
    let nowSaved = false
    setSaved(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        nowSaved = false
      } else {
        next.add(id)
        nowSaved = true
      }
      return next
    })
    return nowSaved
  }

  return (
    <WishlistContext.Provider value={{ saved, toggle, isSaved: id => saved.has(id), count: saved.size }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}
