"use client"

import { useState, useEffect } from "react"
import { Plus, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import ExchangeListings from "./exchange-listings"
import ExchangeRates from "./user-balances"
import CurrencyConverter from "./currency-converter"
import AdvertisementSpace from "./advertisement-space"
import CreateCheckModal from "./create-check-modal"
import ChatInterface from "./chat-interface"
import Header from "./header"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ChatPage from "@/app/chat/page"

// Importando os skeletons
import CurrencyConverterSkeleton from "./skeletons/currency-converter-skeleton"
import ExchangeRatesSkeleton from "./skeletons/exchange-rates-skeleton"
import ExchangeListingsSkeleton from "./skeletons/exchange-listings-skeleton"
import AdvertisementSkeleton from "./skeletons/advertisement-skeleton"

export default function CurrencyExchangeApp() {
  const [isCreateCheckOpen, setIsCreateCheckOpen] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // Adicionar um estado compartilhado para a fonte de taxa (kinguilas ou bancos)
  // Adicionar após a declaração de outros estados
  const [rateSource, setRateSource] = useState<"kinguilas" | "bancos">("kinguilas")

  // Verificar se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar inicialmente
    checkIfMobile()

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Simular carregamento de dados
  useEffect(() => {
    // Simular um tempo de carregamento entre 1.5 e 2.5 segundos
    const loadingTime = Math.random() * 1000 + 1500
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, loadingTime)

    return () => clearTimeout(timer)
  }, [])

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

  // Efeito para controlar o comportamento de scroll
  useEffect(() => {
    const handleScroll = () => {
      const exchangeRatesSection = document.getElementById("exchange-rates-section")
      const rightSidebar = document.querySelector(".right-sidebar-sticky")

      if (exchangeRatesSection && rightSidebar) {
        const exchangeRatesPosition = exchangeRatesSection.getBoundingClientRect().top

        // Quando o usuário rolar até a seção de taxas de câmbio, torna o sidebar direito estático
        if (exchangeRatesPosition <= 100) {
          rightSidebar.classList.add("is-sticky")
        } else {
          rightSidebar.classList.remove("is-sticky")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    console.log("Usuário fez logout")
    // Não precisamos redirecionar aqui, pois isso será feito no AvatarMenu
  }

  // Conteúdo do sidebar esquerdo
  const LeftSidebarContent = () => (
    <>
      {/* Taxas de câmbio em cima, conversor embaixo */}
      <div>
        {isLoading ? (
          <ExchangeRatesSkeleton />
        ) : (
          <ExchangeRates rateSource={rateSource} setRateSource={setRateSource} />
        )}
      </div>
      <div className="mt-3">
        {isLoading ? <CurrencyConverterSkeleton /> : <CurrencyConverter rateSource={rateSource} />}
      </div>
      <div className="p-3 mt-3">
        <Button
          className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 py-1 h-8 text-xs"
          onClick={() => setIsCreateCheckOpen(true)}
          disabled={isLoading}
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
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed */}
      <Header onLogout={handleLogout} />

      {/* Main Layout */}
      <div className="pt-12 flex justify-center px-4 md:px-2">
        <div className="flex max-w-[1200px] w-full">
          {showChat ? (
            <ChatInterface />
            // <ChatPage />
          ) : (
            <>
              {/* Botão do menu para dispositivos móveis */}
              {isMobile && (
                <div className="fixed bottom-6 left-6 z-30">
                  <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                    <SheetTrigger asChild>
                      <Button className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[85%] sm:w-[350px] p-0">
                      <div className="bg-white h-full overflow-auto">
                        <LeftSidebarContent />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              )}

              {/* Left Sidebar - Visível apenas em desktop */}
              <div className="hidden md:block w-[300px] mr-4">
                <div className="sticky top-16">
                  <div className="bg-white rounded-lg shadow-sm">
                    <LeftSidebarContent />
                  </div>
                </div>
              </div>

              {/* Main Content - Flexible width */}
              <div className="flex-1">
                <div className="bg-white rounded-lg shadow-sm">
                  {isLoading ? <ExchangeListingsSkeleton /> : <ExchangeListings isMobile={isMobile} />}
                </div>
              </div>

              {/* Right Sidebar - Visível apenas em desktop */}
              <div className="hidden md:block w-[300px] ml-4">
                <div className="right-sidebar-sticky">
                  <div className="bg-white rounded-lg shadow-sm mb-4">
                    {isLoading ? <AdvertisementSkeleton maxAds={2} /> : <AdvertisementSpace showLastTwo={true} />}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Botão de criar check para dispositivos móveis */}
      {isMobile && !showChat && (
        <div className="fixed bottom-6 right-6 z-30">
          <Button
            className="h-12 w-12 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
            onClick={() => setIsCreateCheckOpen(true)}
            disabled={isLoading}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Modals */}
      <CreateCheckModal isOpen={isCreateCheckOpen} onClose={() => setIsCreateCheckOpen(false)} />
    </div>
  )
}
