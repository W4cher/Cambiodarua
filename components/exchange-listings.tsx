"use client"

import { useState } from "react"
import { Send, Share2, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import ChatModal from "./chat-modal"
import ShareModal from "./share-modal"

export default function ExchangeListings() {
  const [activeChatUser, setActiveChatUser] = useState<{
    id: number
    name: string
    country: string
    online: boolean
  } | null>(null)

  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [shareItem, setShareItem] = useState<{
    id: number
    title: string
  } | null>(null)

  const listings = [
    {
      id: 1,
      user: "Wacher",
      time: "2h",
      country: "Portugal",
      amount: "1.000 EUROS",
      rate: "1190KZ",
      banks: ["BAI", "Santander"],
      online: true,
      status: "active", // active, completed, cancelled
      backgroundImage: null,
    },
    {
      id: 2,
      user: "Marta",
      time: "3h",
      country: "Brasil",
      amount: "1.000 EUROS",
      rate: "1190KZ",
      banks: ["BAI", "Santander"],
      online: false,
      status: "completed",
      backgroundImage: "/placeholder.svg?height=120&width=300&text=Check+Concluído",
    },
    {
      id: 3,
      user: "João",
      time: "5h",
      country: "Angola",
      amount: "1.000 EUROS",
      rate: "1190KZ",
      banks: ["BAI", "Santander"],
      online: true,
      status: "active",
      backgroundImage: null,
    },
  ]

  const handleNegociar = (id: number, name: string, country: string, online: boolean, status: string) => {
    if (status === "completed") return // Não permite negociar checks concluídos

    // Mostrar o chat imediatamente sem spinner
    setActiveChatUser({ id, name, country, online })
  }

  const handleCloseChat = () => {
    setActiveChatUser(null)
  }

  const handleShare = (id: number, amount: string) => {
    setShareItem({
      id,
      title: `Check de ${amount}`,
    })
    setShareModalOpen(true)
  }

  const handleCloseShare = () => {
    setShareModalOpen(false)
    setShareItem(null)
  }

  return (
    <>
      <div className="grid gap-3 p-3 bg-gray-50">
        {listings.map((listing) => (
          <div key={listing.id} className="flex gap-3">
            {/* Avatar à esquerda, fora do card principal */}
            <div className="pt-1">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={listing.user} />
                  <AvatarFallback className="text-xs">{listing.user[0]}</AvatarFallback>
                </Avatar>
                {listing.online && (
                  <span className="absolute bottom-0 right-0 h-2 w-2 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </div>
            </div>

            {/* Conteúdo principal */}
            <div className="flex-1">
              {/* Cabeçalho com informações do usuário */}
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <span className="font-medium text-sm">{listing.user}</span>
                  <span className="text-xs text-gray-500 ml-1">
                    · {listing.time} ·
                    <span className="inline-flex items-center ml-1">
                      <img src="/placeholder.svg?height=16&width=24" alt="Country flag" className="h-2.5 mr-0.5" />
                      {listing.country}
                    </span>
                  </span>
                </div>
              </div>

              {/* Card principal */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Conteúdo do check */}
                <div
                  className={`relative p-3 ${
                    listing.status === "completed"
                      ? "bg-gray-50 border-b border-gray-200"
                      : "bg-blue-50 border-b border-blue-100"
                  }`}
                >
                  {listing.backgroundImage && (
                    <div className="absolute inset-0 opacity-10">
                      <img
                        src={listing.backgroundImage || "/placeholder.svg"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="relative z-10">
                    <div
                      className={`text-xs font-medium ${
                        listing.status === "completed" ? "text-gray-700" : "text-blue-700"
                      }`}
                    >
                      {listing.status === "completed" ? "CHECK CONCLUÍDO" : "CHECK À VENDA"}
                    </div>
                    <div
                      className={`text-base font-bold my-1 ${
                        listing.status === "completed" ? "text-gray-800" : "text-blue-800"
                      }`}
                    >
                      {listing.amount} / {listing.rate}
                    </div>
                    <div
                      className={`text-xs mt-1 ${listing.status === "completed" ? "text-gray-600" : "text-blue-600"}`}
                    >
                      BANCOS
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      {listing.banks.map((bank, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center bg-white px-1.5 py-0.5 rounded shadow-sm text-xs"
                        >
                          <img src="/placeholder.svg?height=16&width=16" alt={`${bank} logo`} className="h-3 mr-0.5" />
                          <span className="text-xs font-medium">{bank}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Botão de negociar */}
                <div className="p-3">
                  <Button
                    className={`w-full py-1 h-8 text-xs font-bold mb-2 ${
                      listing.status === "completed"
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                    onClick={() =>
                      handleNegociar(listing.id, listing.user, listing.country, listing.online, listing.status)
                    }
                    disabled={listing.status === "completed"}
                  >
                    {listing.status === "completed" ? "Negociação Concluída" : "Negociar"}
                  </Button>

                  {/* Ações secundárias */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-600 hover:bg-blue-50 h-7 text-xs px-2"
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      Seguir
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 h-7 text-xs px-2">
                      <Send className="h-3 w-3 mr-1" />
                      Enviar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 h-7 text-xs px-2"
                      onClick={() => handleShare(listing.id, listing.amount)}
                    >
                      <Share2 className="h-3 w-3 mr-1" />
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeChatUser && (
        <ChatModal
          isOpen={!!activeChatUser}
          onClose={handleCloseChat}
          recipient={{
            name: activeChatUser.name,
            country: activeChatUser.country,
            online: activeChatUser.online,
          }}
        />
      )}

      {shareItem && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={handleCloseShare}
          title={shareItem.title}
          url={`https://cambiodarua.com/check/${shareItem.id}`}
        />
      )}
    </>
  )
}

