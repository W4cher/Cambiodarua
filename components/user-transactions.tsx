import { AlertCircle, TrendingDown, TrendingUp } from "lucide-react"

export default function ExchangeInfo() {
  return (
    <div className="overflow-hidden px-2">
      <div className="bg-gray-200 text-gray-700 py-2 px-3 font-bold rounded-t-md text-xs">
        Comparação Kinguilas vs Bancos
      </div>

      <div className="bg-white rounded-b-md shadow-sm border border-gray-200 p-2 space-y-2">
        <div className="bg-gray-50 rounded-md p-2 border border-gray-200">
          <div className="flex items-center gap-1.5 mb-0.5">
            <TrendingUp className="text-green-600 h-3 w-3" />
            <div className="text-xs font-medium text-gray-700">Kinguilas (melhor taxa)</div>
          </div>
          <div className="text-sm font-bold text-gray-800">1 GBP = 1240.86 AOA</div>
        </div>

        <div className="bg-gray-50 rounded-md p-2 border border-gray-200">
          <div className="flex items-center gap-1.5 mb-0.5">
            <TrendingDown className="text-red-600 h-3 w-3" />
            <div className="text-xs font-medium text-gray-700">Bancos (taxa oficial)</div>
          </div>
          <div className="text-sm font-bold text-gray-800">1 GBP = 1203.63 AOA</div>
        </div>

        <div className="bg-gray-50 rounded-md p-2 border border-gray-200">
          <div className="flex items-center gap-1.5 mb-0.5">
            <AlertCircle className="text-blue-600 h-3 w-3" />
            <div className="text-xs font-medium text-gray-700">Diferença</div>
          </div>
          <div className="text-xs text-green-600 font-bold">+3.1% nas Kinguilas</div>
        </div>
      </div>
    </div>
  )
}

