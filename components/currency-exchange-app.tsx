"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExchangeListings from "./exchange-listings"
import ExchangeRates from "./user-balances"
import ExchangeInfo from "./user-transactions"
import AdvertisementSpace from "./advertisement-space"
import CreateCheckModal from "./create-check-modal"
import ChatInterface from "./chat-interface"
import Header from "./header"

export default function CurrencyExchangeApp() {
  const [isCreateCheckOpen, setIsCreateCheckOpen] = useState(false)
  const [showChat, setShowChat] = useState(false)

  // Adicionar event listener para o botão de chat no header
  useEffect(() => {
    const chatButton = document.getElementById("chat-button")
    if (chatButton) {
      const handleChatClick = () => {
        setShowChat(true)
      }

      chatButton.addEventListener("click", handleChatClick)

      return () => {
        chatButton.removeEventListener("click", handleChatClick)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed */}
      <Header />

      {/* Main Layout */}
      <div className="pt-12 flex justify-center">
        <div className="flex max-w-[1200px] w-full">
          {showChat ? (
            <ChatInterface />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateCheckModal isOpen={isCreateCheckOpen} onClose={() => setIsCreateCheckOpen(false)} />
    </div>
  )
}

