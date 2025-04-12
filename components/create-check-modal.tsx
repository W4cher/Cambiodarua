"use client"

import type React from "react"

import { useState } from "react"
import { X, CreditCard, DollarSign, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createTransaction } from "@/services/transaction"

interface CreateCheckModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateCheckModal({ isOpen, onClose }: CreateCheckModalProps) {
  const [amount, setAmount] = useState("")
  const [rate, setRate] = useState("")
  const [selectedSourceCountry, setSelectedSourceCountry] = useState<string>("")
  const [selectedDestCountry, setSelectedDestCountry] = useState<string>("")
  const [selectedSourceBank, setSelectedSourceBank] = useState<string>("")
  const [selectedDestBank, setSelectedDestBank] = useState<string>("")
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)

  const countries = [
    { code: "AO", name: "Angola", flag: "🇦🇴" },
    { code: "PT", name: "Portugal", flag: "🇵🇹" },
    { code: "BR", name: "Brasil", flag: "🇧🇷" },
    { code: "US", name: "Estados Unidos", flag: "🇺🇸" },
    { code: "GB", name: "Reino Unido", flag: "🇬🇧" },
  ]

  const currencies = [
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "USD", name: "Dólar Americano", flag: "🇺🇸" },
    { code: "GBP", name: "Libra Esterlina", flag: "🇬🇧" },
    { code: "BRL", name: "Real Brasileiro", flag: "🇧🇷" },
    { code: "AOA", name: "Kwanza Angolano", flag: "🇦🇴" },
  ]

  const banksByCountry = {
    AO: [
      { id: "BAI", name: "Banco Angolano de Investimentos" },
      { id: "BFA", name: "Banco de Fomento Angola" },
      { id: "BIC", name: "Banco BIC" },
      { id: "BPC", name: "Banco de Poupança e Crédito" },
      { id: "BDA", name: "Banco de Desenvolvimento de Angola" },
    ],
    PT: [
      { id: "CGD", name: "Caixa Geral de Depósitos" },
      { id: "BCP", name: "Millennium BCP" },
      { id: "Santander", name: "Banco Santander Totta" },
      { id: "NovoBanco", name: "Novo Banco" },
    ],
    BR: [
      { id: "Itau", name: "Itaú Unibanco" },
      { id: "Bradesco", name: "Banco Bradesco" },
      { id: "BB", name: "Banco do Brasil" },
      { id: "Caixa", name: "Caixa Econômica Federal" },
    ],
    US: [
      { id: "Chase", name: "JPMorgan Chase" },
      { id: "BofA", name: "Bank of America" },
      { id: "Wells", name: "Wells Fargo" },
      { id: "Citi", name: "Citibank" },
    ],
    GB: [
      { id: "HSBC", name: "HSBC" },
      { id: "Barclays", name: "Barclays" },
      { id: "Lloyds", name: "Lloyds Bank" },
      { id: "NatWest", name: "NatWest" },
    ],
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setBackgroundImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setBackgroundImage(null)
  }

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const sellerId = user?._id;
  
      if (!sellerId) {
        console.error("Usuário não autenticado.");
        return;
      }
  
      const payload = {
        amount: Number(amount),
        exchangeRate: Number(rate),
        currency: "EUR", // Add dynamic selection later if needed
        exchangeCurrency: "AOA", // Add dynamic selection later if needed
        originCountry: selectedSourceCountry,
        originBank: selectedSourceBank,
        destinationCountry: selectedDestCountry,
        destinationBank: selectedDestBank,
        paymentMethods: ["Transferencia"], // Optional: make dynamic
        backgroundImage: backgroundImage ?? undefined,
        seller: sellerId, // ✅ set seller here
      };
  
      await createTransaction(payload);
      console.log("Transação criada com sucesso");
      onClose();
    } catch (error) {
      console.error("Erro ao criar transação:", error);
    }
  };
  



  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-blue-600 text-white p-3 rounded-t-lg flex items-center justify-between sticky top-0 z-10">
          <h2 className="font-bold">Criar Check</h2>
          <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 overflow-auto">
          <div className="p-4">
            <Tabs defaultValue="venda" className="w-full">
              <TabsList className="grid w-full grid-cols-1 mb-4">
                <TabsTrigger value="venda">Venda</TabsTrigger>
              </TabsList>

              <TabsContent value="venda" className="space-y-4">
                {/* Imagem de fundo */}
                <div className="space-y-2">
                  <Label>Imagem de fundo (opcional)</Label>
                  <div className="flex items-center gap-2">
                    {backgroundImage ? (
                      <div className="relative w-full h-32 rounded-md overflow-hidden">
                        <img
                          src={backgroundImage || "/placeholder.svg"}
                          alt="Background"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6 rounded-full"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="w-full">
                        <label
                          htmlFor="background-image"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-xs text-gray-500">Clique para adicionar uma imagem de fundo</p>
                          </div>
                          <input
                            id="background-image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

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

                <div className="grid grid-cols-2 gap-4">
                  {/* País e banco de origem */}
                  <div className="space-y-2">
                    <Label>País de origem</Label>
                    <Select value={selectedSourceCountry} onValueChange={setSelectedSourceCountry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <div className="flex items-center">
                              <span className="mr-2">{country.flag}</span>
                              <span>{country.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Banco de origem</Label>
                    <Select
                      value={selectedSourceBank}
                      onValueChange={setSelectedSourceBank}
                      disabled={!selectedSourceCountry}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={selectedSourceCountry ? "Selecione" : "Selecione o país primeiro"} />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedSourceCountry &&
                          banksByCountry[selectedSourceCountry as keyof typeof banksByCountry]?.map((bank) => (
                            <SelectItem key={bank.id} value={bank.id}>
                              {bank.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* País e banco de destino */}
                  <div className="space-y-2">
                    <Label>País de destino</Label>
                    <Select value={selectedDestCountry} onValueChange={setSelectedDestCountry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <div className="flex items-center">
                              <span className="mr-2">{country.flag}</span>
                              <span>{country.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Banco de destino</Label>
                    <Select
                      value={selectedDestBank}
                      onValueChange={setSelectedDestBank}
                      disabled={!selectedDestCountry}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={selectedDestCountry ? "Selecione" : "Selecione o país primeiro"} />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedDestCountry &&
                          banksByCountry[selectedDestCountry as keyof typeof banksByCountry]?.map((bank) => (
                            <SelectItem key={bank.id} value={bank.id}>
                              {bank.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
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
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-2 sticky bottom-0 bg-white rounded-b-lg">
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

