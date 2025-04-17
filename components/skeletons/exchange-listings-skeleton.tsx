import { Skeleton } from "@/components/ui/skeleton"

export default function ExchangeListingsSkeleton() {
  return (
    <div className="grid gap-3 p-3 bg-gray-50">
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} className="flex gap-3">
          {/* Avatar à esquerda */}
          <div className="pt-1">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-1.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Card principal */}
            <Skeleton className="h-[150px] w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}
