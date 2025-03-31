"use client"

import { useState } from "react"
import { Share2, UserPlus, CheckCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import ChatModal from "./chat-modal"
import ShareModal from "./share-modal"
import MobileAdUnit from "./mobile-ad-unit"

interface ExchangeListingsProps {
  isMobile?: boolean
}

export default function ExchangeListings({ isMobile = false }: ExchangeListingsProps) {
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

  const [followedUsers, setFollowedUsers] = useState<number[]>([])

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
      verified: false,
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
      verified: false,
    },
    {
      id: 3,
      user: "Bernardino Teixeira",
      time: "5h",
      country: "Angola",
      amount: "1.000 EUROS",
      rate: "1190KZ",
      banks: ["BAI", "Santander"],
      online: true,
      status: "active",
      backgroundImage: null,
      verified: true,
    },
    {
      id: 4,
      user: "Ana",
      time: "6h",
      country: "Portugal",
      amount: "500 EUROS",
      rate: "1195KZ",
      banks: ["BFA", "Millennium"],
      online: true,
      status: "active",
      backgroundImage: null,
      verified: false,
    },
    {
      id: 5,
      user: "Nelson Guerra",
      time: "8h",
      country: "Angola",
      amount: "2.000 EUROS",
      rate: "1185KZ",
      banks: ["BAI", "BPC"],
      online: false,
      status: "active",
      backgroundImage: null,
      verified: true,
    },
    {
      id: 6,
      user: "Sofia",
      time: "10h",
      country: "Brasil",
      amount: "300 EUROS",
      rate: "1200KZ",
      banks: ["Bradesco", "Santander"],
      online: true,
      status: "completed",
      backgroundImage: null,
      verified: false,
    },
  ]

  // Anúncios para dispositivos móveis
  const mobileAds = [
    {
      id: 1,
      title: "Transferências Internacionais",
      description: "Envie dinheiro para qualquer lugar do mundo com as melhores taxas",
      image: "/placeholder.svg?height=120&width=300&text=Transferências",
      link: "#",
    },
    {
      id: 2,
      title: "Seguro de Viagem",
      description: "Viaje tranquilo com nosso seguro completo",
      image: "/placeholder.svg?height=120&width=300&text=Seguro",
      link: "#",
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

  const handleFollow = (id: number) => {
    setFollowedUsers((prev) => [...prev, id])
  }

  // Função para renderizar os itens com anúncios intercalados em dispositivos móveis
  const renderListingsWithAds = () => {
    const result = []
    let adIndex = 0

    for (let i = 0; i < listings.length; i++) {
      // Adicionar o item de listagem
      result.push(
        <ListingItem
          key={`listing-${listings[i].id}`}
          listing={listings[i]}
          onNegociar={handleNegociar}
          onShare={handleShare}
          onFollow={handleFollow}
          isFollowed={followedUsers.includes(listings[i].id)}
        />,
      )

      // A cada 3 itens, adicionar um anúncio (apenas em dispositivos móveis)
      if (isMobile && (i + 1) % 3 === 0 && adIndex < mobileAds.length) {
        result.push(<MobileAdUnit key={`ad-${mobileAds[adIndex].id}`} ad={mobileAds[adIndex]} />)
        adIndex++
      }
    }

    return result
  }

  return (
    <>
      <div className="grid gap-3 p-3 bg-gray-50">{renderListingsWithAds()}</div>

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

// Componente para cada item de listagem
interface ListingItemProps {
  listing: any
  onNegociar: (id: number, name: string, country: string, online: boolean, status: string) => void
  onShare: (id: number, amount: string) => void
  onFollow: (id: number) => void
  isFollowed: boolean
}

function ListingItem({ listing, onNegociar, onShare, onFollow, isFollowed }: ListingItemProps) {
  return (
    <div className="flex gap-3">
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
          <div className="flex items-center">
            <span className="font-medium text-sm">{listing.user}</span>
            {listing.verified && <CheckCircle className="h-3.5 w-3.5 text-blue-500 ml-1" />}
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
                className={`text-xs font-medium ${listing.status === "completed" ? "text-gray-700" : "text-blue-700"}`}
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
              <div className={`text-xs mt-1 ${listing.status === "completed" ? "text-gray-600" : "text-blue-600"}`}>
                BANCOS
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                {listing.banks.map((bank: string, index: number) => (
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
              onClick={() => onNegociar(listing.id, listing.user, listing.country, listing.online, listing.status)}
              disabled={listing.status === "completed"}
            >
              {listing.status === "completed" ? "Negociação Concluída" : "Negociar"}
            </Button>

            {/* Ações secundárias */}
            <div className="flex items-center justify-between">
              {!isFollowed ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 h-7 text-xs px-2"
                  onClick={() => onFollow(listing.id)}
                >
                  <UserPlus className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Seguir</span>
                </Button>
              ) : (
                <div className="w-16"></div> // Espaço vazio para manter o layout
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 h-7 text-xs px-2 ml-auto"
                onClick={() => onShare(listing.id, listing.amount)}
              >
                <Share2 className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Compartilhar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

