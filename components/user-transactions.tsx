import { AlertCircle, TrendingDown, TrendingUp } from "lucide-react"

export default function ExchangeInfo() {
  return (
    <div className="overflow-hidden px-2">
      <div className="bg-gray-200 text-gray-700 py-2 px-3 font-bold rounded-t-md text-xs">Informações de Câmbio</div>

      <div className="bg-white rounded-b-md shadow-sm border border-gray-200 p-2 space-y-2">
        <div className="bg-gray-50 rounded-md p-2 border border-gray-200">
          <div className="flex items-center gap-1.5 mb-0.5">
            <TrendingUp className="text-green-600 h-3 w-3" />
            <div className="text-xs font-medium text-gray-700">Taxa mais alta</div>
          </div>
          <div className="text-sm font-bold text-gray-800">1 GBP = 1240.86 AOA</div>
        </div>

        <div className="bg-gray-50 rounded-md p-2 border border-gray-200">
          <div className="flex items-center gap-1.5 mb-0.5">
            <TrendingDown className="text-red-600 h-3 w-3" />
            <div className="text-xs font-medium text-gray-700">Taxa mais baixa</div>
          </div>
          <div className="text-sm font-bold text-gray-800">1 CNY = 129.65 AOA</div>
        </div>

        <div className="bg-gray-50 rounded-md p-2 border border-gray-200">
          <div className="flex items-center gap-1.5 mb-0.5">
            <AlertCircle className="text-gray-600 h-3 w-3" />
            <div className="text-xs font-medium text-gray-700">Atualizado</div>
          </div>
          <div className="text-xs text-gray-800">Hoje às 14:30</div>
        </div>
      </div>
    </div>
  )
}

