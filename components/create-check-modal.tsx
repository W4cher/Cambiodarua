"use client"

import { useState } from "react"
import { X, Plus, Minus, CreditCard, Building, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CreateCheckModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateCheckModal({ isOpen, onClose }: CreateCheckModalProps) {
  const [amount, setAmount] = useState("")
  const [rate, setRate] = useState("")
  const [selectedBanks, setSelectedBanks] = useState<string[]>(["BAI"])

  const currencies = [
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "USD", name: "Dólar Americano", flag: "🇺🇸" },
    { code: "GBP", name: "Libra Esterlina", flag: "🇬🇧" },
    { code: "BRL", name: "Real Brasileiro", flag: "🇧🇷" },
    { code: "AOA", name: "Kwanza Angolano", flag: "🇦🇴" },
  ]

  const banks = [
    { id: "BAI", name: "Banco Angolano de Investimentos" },
    { id: "BFA", name: "Banco de Fomento Angola" },
    { id: "BIC", name: "Banco BIC" },
    { id: "BPC", name: "Banco de Poupança e Crédito" },
    { id: "BDA", name: "Banco de Desenvolvimento de Angola" },
    { id: "Santander", name: "Banco Santander" },
  ]

  const handleAddBank = (bankId: string) => {
    if (!selectedBanks.includes(bankId)) {
      setSelectedBanks([...selectedBanks, bankId])
    }
  }

  const handleRemoveBank = (bankId: string) => {
    setSelectedBanks(selectedBanks.filter((id) => id !== bankId))
  }

  const handleSubmit = () => {
    // Aqui você implementaria a lógica para salvar o check
    console.log({
      amount,
      rate,
      selectedBanks,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="bg-blue-600 text-white p-3 rounded-t-lg flex items-center justify-between">
          <h2 className="font-bold">Criar Check</h2>
          <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          <Tabs defaultValue="venda" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="venda">Venda</TabsTrigger>
              <TabsTrigger value="compra">Compra</TabsTrigger>
            </TabsList>

            <TabsContent value="venda" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Moeda</Label>
                <Select defaultValue="EUR">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a moeda" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center">
                          <span className="mr-2">{currency.flag}</span>
                          <span>
                            {currency.code} - {currency.name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Valor</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    id="amount"
                    placeholder="Ex: 1000"
                    className="pl-10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Taxa (KZ)</Label>
                <Input id="rate" placeholder="Ex: 1190" value={rate} onChange={(e) => setRate(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Bancos Aceitos</Label>
                <div className="grid grid-cols-2 gap-2">
                  {selectedBanks.map((bankId) => {
                    const bank = banks.find((b) => b.id === bankId)
                    return (
                      <div key={bankId} className="flex items-center bg-blue-50 rounded-md p-2 border border-blue-100">
                        <Building className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-xs flex-1 truncate">{bank?.name || bankId}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleRemoveBank(bankId)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                    )
                  })}

                  <div className="flex items-center justify-center bg-gray-50 rounded-md p-2 border border-dashed border-gray-300">
                    <Select onValueChange={handleAddBank}>
                      <SelectTrigger className="border-0 bg-transparent h-auto p-0 shadow-none text-xs text-blue-600 hover:text-blue-700">
                        <div className="flex items-center">
                          <Plus className="h-3 w-3 mr-1" />
                          <span>Adicionar Banco</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {banks
                          .filter((bank) => !selectedBanks.includes(bank.id))
                          .map((bank) => (
                            <SelectItem key={bank.id} value={bank.id}>
                              {bank.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment">Métodos de Pagamento</Label>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center bg-blue-50 rounded-md px-3 py-1.5 border border-blue-100">
                    <CreditCard className="h-3 w-3 text-blue-500 mr-1.5" />
                    <span className="text-xs">Transferência</span>
                  </div>
                  <div className="flex items-center bg-gray-50 rounded-md px-3 py-1.5 border border-gray-200">
                    <CreditCard className="h-3 w-3 text-gray-500 mr-1.5" />
                    <span className="text-xs">Depósito</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compra" className="space-y-4">
              <div className="text-center text-gray-500 py-8">Funcionalidade de compra em desenvolvimento.</div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
            Publicar
          </Button>
        </div>
      </div>
    </div>
  )
}

