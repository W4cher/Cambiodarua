import { Skeleton } from "@/components/ui/skeleton"

export default function AdvertisementSkeleton({ maxAds = 3 }) {
  return (
    <div className="p-2">
      <div className="space-y-3">
        {Array.from({ length: maxAds }).map((_, index) => (
          <div key={index}>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-[120px] w-full rounded-md" />
            <Skeleton className="h-12 w-full mt-2 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}
