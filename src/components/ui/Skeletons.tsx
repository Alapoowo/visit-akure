import { cn } from '@/lib/utils'

function Shimmer({ className }: { className?: string }) {
  return (
    <div className={cn('skeleton rounded-lg', className)} />
  )
}

export function ListingCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      <Shimmer className="h-52 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Shimmer className="h-3 w-24" />
        <Shimmer className="h-4 w-4/5" />
        <Shimmer className="h-3 w-3/5" />
        <div className="flex gap-2">
          <Shimmer className="h-5 w-16 rounded-full" />
          <Shimmer className="h-5 w-16 rounded-full" />
          <Shimmer className="h-5 w-16 rounded-full" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <Shimmer className="h-6 w-28" />
          <Shimmer className="h-8 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export function ListingGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ListingCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ListingDetailSkeleton() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-6 space-y-8">
      <Shimmer className="h-[460px] w-full rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
        <div className="space-y-5">
          <Shimmer className="h-10 w-2/3" />
          <Shimmer className="h-5 w-1/2" />
          <div className="grid grid-cols-4 gap-3">
            {[1,2,3,4].map(i => <Shimmer key={i} className="h-20 rounded-xl" />)}
          </div>
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-5/6" />
          <Shimmer className="h-4 w-4/5" />
        </div>
        <Shimmer className="h-96 rounded-2xl" />
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
      <Shimmer className="h-9 w-9 rounded-xl" />
      <Shimmer className="h-8 w-20" />
      <Shimmer className="h-3 w-24" />
      <Shimmer className="h-3 w-16" />
    </div>
  )
}
