"use client"

import { useState } from "react"
import { Home, MessageCircle, Plus, RefreshCw, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExchangeListings from "./exchange-listings"
import ExchangeRates from "./user-balances"
import ExchangeInfo from "./user-transactions"
import AdvertisementSpace from "./advertisement-space"
import ChatListModal from "./chat-list-modal"
import CreateCheckModal from "./create-check-modal"

export default function CurrencyExchangeApp() {
  const [isChatListOpen, setIsChatListOpen] = useState(false)
  const [isCreateCheckOpen, setIsCreateCheckOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed */}
      <header className="bg-white py-1 px-4 border-b flex items-center justify-between fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold">CAMBIO DA RUA</h1>
          <Home className="text-green-600 h-4 w-4" />
        </div>
        <div className="relative flex-1 max-w-xl mx-4">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
          <Input className="pl-7 py-1 h-8 text-sm bg-gray-100 border-none" placeholder="Buscar vendedores, bancos..." />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-100 rounded-full p-1.5">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full relative">
              <RefreshCw className="h-4 w-4 text-gray-500" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-green-500 rounded-full"></span>
            </Button>
          </div>

          <div className="flex items-center bg-gray-100 rounded-full p-1.5">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 rounded-full relative"
              onClick={() => setIsChatListOpen(true)}
            >
              <MessageCircle className="h-4 w-4 text-gray-500" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-green-500 rounded-full"></span>
            </Button>
          </div>

          <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
            <AvatarImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6y1DD2HpE44nRO31RSOdKy9JdsolMN.png"
              alt="User"
            />
            <AvatarFallback className="text-xs">JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Layout - With fixed width sidebars */}
      <div className="pt-12 flex justify-center">
        <div className="flex max-w-[1200px] w-full">
          {/* Left Sidebar - Fixed width */}
          <div className="w-[300px] bg-white rounded-lg shadow-sm mr-4 h-fit">
            <ExchangeRates />
            <div className="mt-3">
              <ExchangeInfo />
            </div>
            <div className="p-3 mt-3">
              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 py-1 h-8 text-xs"
                onClick={() => setIsCreateCheckOpen(true)}
              >
                <Plus className="h-3 w-3" />
                <span className="flex items-center gap-1">
                  <span className="bg-white text-green-600 p-0.5 rounded">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  Criar Check
                </span>
              </Button>
            </div>
          </div>

          {/* Main Content - Flexible width */}
          <div className="flex-1">
            <Tabs defaultValue="ofertas" className="bg-white rounded-lg shadow-sm">
              <TabsList className="w-full grid grid-cols-3 h-9 bg-gray-200">
                <TabsTrigger
                  value="ofertas"
                  className="text-xs py-1.5 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-blue-700"
                >
                  Ofertas
                </TabsTrigger>
                <TabsTrigger
                  value="compra"
                  className="text-xs py-1.5 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-blue-700"
                >
                  compra
                </TabsTrigger>
                <TabsTrigger
                  value="vendas"
                  className="text-xs py-1.5 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-blue-700"
                >
                  vendas
                </TabsTrigger>
              </TabsList>
              <TabsContent value="ofertas" className="p-0">
                <ExchangeListings />
              </TabsContent>
              <TabsContent value="compra">
                <div className="p-4 text-sm">Conteúdo de compra</div>
              </TabsContent>
              <TabsContent value="vendas">
                <div className="p-4 text-sm">Conteúdo de vendas</div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Fixed width */}
          <div className="w-[300px] bg-white rounded-lg shadow-sm ml-4 h-fit">
            <AdvertisementSpace />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ChatListModal isOpen={isChatListOpen} onClose={() => setIsChatListOpen(false)} />
      <CreateCheckModal isOpen={isCreateCheckOpen} onClose={() => setIsCreateCheckOpen(false)} />
    </div>
  )
}

