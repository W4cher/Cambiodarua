import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function ExchangeRates() {
  const currencies = [
    {
      code: "EUR",
      name: "Euro",
      flag: "🇪🇺",
      sellRate: "118.52861",
    },
    {
      code: "USD",
      name: "Dólar dos Estados Unidos",
      flag: "🇺🇸",
      sellRate: "115.45592",
    },
    {
      code: "GBP",
      name: "Libra Esterlina",
      flag: "🇬🇧",
      sellRate: "1240.86103",
    },
  ]

  return (
    <div className="overflow-hidden" id="exchange-rates-section">
      <div className="bg-gray-100 text-gray-700 py-2 px-3 text-center font-bold text-sm border-b">TAXAS DE CÂMBIO</div>

      <Tabs defaultValue="divisas">
        <TabsList className="w-full grid grid-cols-2 h-8 bg-gray-50">
          <TabsTrigger
            value="divisas"
            className="text-xs data-[state=active]:border-b-2 data-[state=active]:border-gray-500 data-[state=active]:text-gray-700 rounded-none"
          >
            KINGUILAS
          </TabsTrigger>
          <TabsTrigger
            value="notas"
            className="text-xs data-[state=active]:border-b-2 data-[state=active]:border-gray-500 data-[state=active]:text-gray-700 rounded-none"
          >
            BANCOS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="divisas" className="p-0">
          <div className="grid grid-cols-1 gap-2 p-2">
            {currencies.map((currency) => (
              <div
                key={currency.code}
                className="bg-white rounded-md p-2 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{currency.flag}</span>
                    <span className="font-bold text-sm">{currency.code}</span>
                  </div>
                  <div className="bg-gray-200 text-gray-700 text-[10px] font-bold px-1.5 py-0.5 rounded">VENDA</div>
                </div>
                <div className="text-[10px] text-gray-500 mb-0.5">{currency.name}</div>
                <div className="text-right text-gray-700 font-bold text-sm">{currency.sellRate} AOA</div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notas" className="p-0">
          <div className="grid grid-cols-1 gap-2 p-2">
            {currencies.map((currency) => (
              <div
                key={currency.code}
                className="bg-white rounded-md p-2 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{currency.flag}</span>
                    <span className="font-bold text-sm">{currency.code}</span>
                  </div>
                  <div className="bg-gray-200 text-gray-700 text-[10px] font-bold px-1.5 py-0.5 rounded">VENDA</div>
                </div>
                <div className="text-[10px] text-gray-500 mb-0.5">{currency.name}</div>
                <div className="text-right text-gray-700 font-bold text-sm">
                  {(Number.parseFloat(currency.sellRate) * 0.97).toFixed(5)} AOA
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

