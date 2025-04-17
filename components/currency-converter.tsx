"use client"

import { useState, useEffect } from "react"
import { ArrowLeftRight, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Taxas de câmbio de exemplo (em um app real, viriam de uma API)
const exchangeRates = {
  kinguilas: {
    EUR: { AOA: 1240.86, USD: 1.08 },
    USD: { AOA: 1145.55, EUR: 0.93 },
    GBP: { AOA: 1450.25, EUR: 1.17, USD: 1.26 },
    AOA: { EUR: 0.000806, USD: 0.000873, GBP: 0.00069 },
  },
  bancos: {
    EUR: { AOA: 1203.63, USD: 1.08 },
    USD: { AOA: 1115.4, EUR: 0.93 },
    GBP: { AOA: 1410.75, EUR: 1.17, USD: 1.26 },
    AOA: { EUR: 0.000831, USD: 0.000896, GBP: 0.000709 },
  },
}

// Lista de moedas disponíveis
const currencies = [
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "USD", name: "Dólar Americano", flag: "🇺🇸" },
  { code: "GBP", name: "Libra Esterlina", flag: "🇬🇧" },
  { code: "AOA", name: "Kwanza Angolano", flag: "🇦🇴" },
]

// Modificar a declaração da função para aceitar props
export default function CurrencyConverter({ rateSource }: { rateSource: "kinguilas" | "bancos" }) {
  const [amount, setAmount] = useState<string>("1000")
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("AOA")
  const [convertedAmount, setConvertedAmount] = useState<string>("0")
  const [currentRate, setCurrentRate] = useState<number>(0)

  // Efeito para calcular a conversão quando qualquer dependência mudar
  useEffect(() => {
    convertCurrency()
  }, [amount, fromCurrency, toCurrency, rateSource])

  // Função para converter a moeda
  const convertCurrency = () => {
    const numericAmount = Number.parseFloat(amount) || 0

    // Obter a taxa de câmbio direta se disponível
    if (exchangeRates[rateSource][fromCurrency] && exchangeRates[rateSource][fromCurrency][toCurrency]) {
      const rate = exchangeRates[rateSource][fromCurrency][toCurrency]
      setCurrentRate(rate)
      setConvertedAmount((numericAmount * rate).toFixed(2))
    }
    // Caso contrário, calcular através de AOA como moeda intermediária
    else if (
      exchangeRates[rateSource][fromCurrency] &&
      exchangeRates[rateSource][fromCurrency]["AOA"] &&
      exchangeRates[rateSource][toCurrency] &&
      exchangeRates[rateSource]["AOA"][toCurrency]
    ) {
      const toAOA = exchangeRates[rateSource][fromCurrency]["AOA"]
      const fromAOA = exchangeRates[rateSource]["AOA"][toCurrency]
      const rate = fromAOA * toAOA
      setCurrentRate(rate)
      setConvertedAmount((numericAmount * rate).toFixed(2))
    }
    // Conversão inversa
    else if (exchangeRates[rateSource][toCurrency] && exchangeRates[rateSource][toCurrency][fromCurrency]) {
      const rate = 1 / exchangeRates[rateSource][toCurrency][fromCurrency]
      setCurrentRate(rate)
      setConvertedAmount((numericAmount * rate).toFixed(2))
    } else {
      setCurrentRate(0)
      setConvertedAmount("Taxa não disponível")
    }
  }

  // Função para trocar as moedas
  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  // Formatar a taxa de câmbio para exibição
  const formatRate = () => {
    if (currentRate === 0) return "Taxa não disponível"

    const formattedRate = currentRate.toFixed(4)
    const currencySymbols = {
      EUR: "€",
      USD: "$",
      GBP: "£",
      AOA: "Kz",
    }

    return `1 ${currencySymbols[fromCurrency as keyof typeof currencySymbols] || ""}${fromCurrency} = ${
      currencySymbols[toCurrency as keyof typeof currencySymbols] || ""
    }${formattedRate} ${toCurrency}`
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        {/* Modificar o cabeçalho para remover os botões de seleção */}
        <div className="mb-4">
          <h2 className="font-bold text-lg mb-2">Conversor de Moedas</h2>
          <div className="flex items-center justify-end gap-2">
            <div className="text-xs text-gray-500">
              Usando taxas de {rateSource === "kinguilas" ? "Kinguilas" : "Bancos"}
            </div>
            <Button variant="ghost" size="sm" onClick={convertCurrency} className="h-7 w-7 p-0">
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {/* Campo de entrada */}
          <div className="space-y-1">
            <div className="flex">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-r-none"
                placeholder="Montante"
              />
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-[100px] rounded-l-none border-l-0">
                  <SelectValue placeholder="Moeda" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center">
                        <span className="mr-2">{currency.flag}</span>
                        <span>{currency.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Botão de troca */}
          <div className="flex justify-center">
            <Button variant="ghost" size="icon" onClick={swapCurrencies} className="h-7 w-7 p-0">
              <ArrowLeftRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Campo de resultado */}
          <div className="space-y-1">
            <div className="flex">
              <Input
                type="text"
                value={convertedAmount}
                readOnly
                className="rounded-r-none bg-gray-50"
                placeholder="Resultado"
              />
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-[100px] rounded-l-none border-l-0">
                  <SelectValue placeholder="Moeda" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center">
                        <span className="mr-2">{currency.flag}</span>
                        <span>{currency.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Taxa de câmbio */}
          <div className="text-sm text-gray-600 text-center mt-2">{formatRate()}</div>
        </div>
      </CardContent>
    </Card>
  )
}
