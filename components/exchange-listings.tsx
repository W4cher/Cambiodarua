"use client"

import { useState } from "react"
import { Send, Share2, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import ChatModal from "./chat-modal"

export default function ExchangeListings() {
  const [activeChatUser, setActiveChatUser] = useState<{
    id: number
    name: string
    country: string
    online: boolean
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
    },
  ]

  const handleNegociar = (id: number, name: string, country: string, online: boolean) => {
    setActiveChatUser({ id, name, country, online })
  }

  const handleCloseChat = () => {
    setActiveChatUser(null)
  }

  return (
    <>
      <div className="grid gap-3 p-3 bg-gray-50">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white p-3 rounded-md shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-2 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={listing.user} />
                <AvatarFallback className="text-xs">{listing.user[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-sm">{listing.user}</span>
                    <div className="text-xs text-gray-500">
                      Publicado há {listing.time} ·
                      <span className="inline-flex items-center ml-1">
                        <img src="/placeholder.svg?height=16&width=24" alt="Portugal flag" className="h-2.5 mr-0.5" />
                        {listing.country}
                      </span>
                    </div>
                  </div>
                  <div className={`h-2 w-2 ${listing.online ? "bg-green-500" : "bg-gray-300"} rounded-full`}></div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-md p-2 mb-2 text-center border border-blue-100">
              <div className="text-xs font-medium text-blue-700">CHECK À VENDA</div>
              <div className="text-base font-bold text-blue-800 my-0.5">
                {listing.amount} / {listing.rate}
              </div>
              <div className="text-xs text-blue-600 mt-1">BANCOS</div>
              <div className="flex items-center justify-center gap-2 mt-0.5">
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

            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-2 py-1 h-8 text-xs font-bold"
              onClick={() => handleNegociar(listing.id, listing.user, listing.country, listing.online)}
            >
              Negociar
            </Button>

            <div className="flex items-center justify-between border-t pt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 h-7 text-xs px-2"
              >
                <UserPlus className="h-3 w-3 mr-1" />
                Seguir
              </Button>
              {/* <Button variant="ghost" size="sm" className="text-gray-500 h-7 text-xs px-2">
                <Send className="h-3 w-3 mr-1" />
                Enviar
              </Button> */}
              <Button variant="ghost" size="sm" className="text-gray-500 h-7 text-xs px-2">
                <Share2 className="h-3 w-3 mr-1" />
                Compartilhar
              </Button>
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
    </>
  )
}

