import { Skeleton } from "@/components/ui/skeleton"

export default function ExchangeRatesSkeleton() {
  return (
    <div className="overflow-hidden">
      <div className="bg-gray-100 text-gray-700 py-2 px-3 text-center font-bold text-sm border-b">TAXAS DE CÂMBIO</div>

      <div className="w-full grid grid-cols-2 h-8 bg-gray-50">
        <Skeleton className="h-8 w-full rounded-none" />
      </div>

      <div className="p-2 space-y-2">
        {[1, 2, 3].map((index) => (
          <Skeleton key={index} className="h-[72px] w-full rounded-md" />
        ))}
      </div>
    </div>
  )
}
