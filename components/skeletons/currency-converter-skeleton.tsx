import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function CurrencyConverterSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="mb-4">
          <Skeleton className="h-6 w-40 mb-2" />
          <div className="flex items-center justify-end gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-7 w-7 rounded-md" />
          </div>
        </div>

        <div className="space-y-3">
          {/* Campo de entrada */}
          <div className="space-y-1">
            <div className="flex">
              <Skeleton className="h-10 flex-1 rounded-r-none" />
              <Skeleton className="h-10 w-[100px] rounded-l-none" />
            </div>
          </div>

          {/* Botão de troca */}
          <div className="flex justify-center">
            <Skeleton className="h-7 w-7 rounded-md" />
          </div>

          {/* Campo de resultado */}
          <div className="space-y-1">
            <div className="flex">
              <Skeleton className="h-10 flex-1 rounded-r-none" />
              <Skeleton className="h-10 w-[100px] rounded-l-none" />
            </div>
          </div>

          {/* Taxa de câmbio */}
          <div className="flex justify-center">
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
