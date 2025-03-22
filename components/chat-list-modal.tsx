"use client"

import { useState } from "react"
import { X, Search, Check, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChatModal from "./chat-modal"

interface ChatListModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatListModal({ isOpen, onClose }: ChatListModalProps) {
  const [activeChat, setActiveChat] = useState<{
    name: string
    country: string
    online: boolean
  } | null>(null)

  const conversations = [
    {
      id: 1,
      name: "Wacher",
      lastMessage: "Sim, ainda está disponível! Podemos negociar.",
      time: "14:30",
      unread: 2,
      country: "Portugal",
      online: true,
      amount: "1.000 EUROS",
      rate: "1190KZ",
      status: "pending", // pending, completed, cancelled
    },
    {
      id: 2,
      name: "Marta",
      lastMessage: "Obrigado pela negociação!",
      time: "Ontem",
      unread: 0,
      country: "Brasil",
      online: false,
      amount: "500 EUROS",
      rate: "595KZ",
      status: "completed",
    },
    {
      id: 3,
      name: "João",
      lastMessage: "Vou pensar e te aviso mais tarde.",
      time: "Seg",
      unread: 0,
      country: "Angola",
      online: true,
      amount: "2.000 EUROS",
      rate: "2380KZ",
      status: "cancelled",
    },
    {
      id: 4,
      name: "Carlos",
      lastMessage: "Qual é o melhor horário para trocarmos?",
      time: "Hoje",
      unread: 1,
      country: "Moçambique",
      online: true,
      amount: "300 EUROS",
      rate: "357KZ",
      status: "pending",
    },
  ]

  const handleOpenChat = (name: string, country: string, online: boolean) => {
    setActiveChat({ name, country, online })
  }

  const handleCloseChat = () => {
    setActiveChat(null)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md flex flex-col h-[600px] max-h-[90vh]">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex items-center justify-between">
            <h2 className="font-bold">Conversas</h2>
            <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Pesquisar conversas" className="pl-10 bg-gray-100 border-none" />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <TabsList className="w-full grid grid-cols-3 h-10 bg-gray-50 rounded-none">
              <TabsTrigger value="all" className="text-xs rounded-none">
                Todas
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-xs rounded-none">
                Pendentes
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs rounded-none">
                Concluídas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="flex-1 overflow-y-auto p-0 m-0">
              <div className="divide-y">
                {conversations.map((convo) => (
                  <div
                    key={convo.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                    onClick={() => handleOpenChat(convo.name, convo.country, convo.online)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={`/placeholder.svg?height=48&width=48&text=${convo.name[0]}`}
                          alt={convo.name}
                        />
                        <AvatarFallback>{convo.name[0]}</AvatarFallback>
                      </Avatar>
                      {convo.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{convo.name}</span>
                        <span className="text-xs text-gray-500">{convo.time}</span>
                      </div>
                      <div className="text-xs text-gray-500 truncate">{convo.lastMessage}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          {convo.amount}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
                          {convo.rate}
                        </span>
                        {convo.status === "completed" && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-800 flex items-center">
                            <Check className="h-2 w-2 mr-0.5" /> Concluído
                          </span>
                        )}
                        {convo.status === "pending" && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 flex items-center">
                            <Clock className="h-2 w-2 mr-0.5" /> Pendente
                          </span>
                        )}
                      </div>
                    </div>

                    {convo.unread > 0 && (
                      <div className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {convo.unread}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="flex-1 overflow-y-auto p-0 m-0">
              <div className="divide-y">
                {conversations
                  .filter((convo) => convo.status === "pending")
                  .map((convo) => (
                    <div
                      key={convo.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                      onClick={() => handleOpenChat(convo.name, convo.country, convo.online)}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`/placeholder.svg?height=48&width=48&text=${convo.name[0]}`}
                            alt={convo.name}
                          />
                          <AvatarFallback>{convo.name[0]}</AvatarFallback>
                        </Avatar>
                        {convo.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{convo.name}</span>
                          <span className="text-xs text-gray-500">{convo.time}</span>
                        </div>
                        <div className="text-xs text-gray-500 truncate">{convo.lastMessage}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            {convo.amount}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
                            {convo.rate}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 flex items-center">
                            <Clock className="h-2 w-2 mr-0.5" /> Pendente
                          </span>
                        </div>
                      </div>

                      {convo.unread > 0 && (
                        <div className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {convo.unread}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="flex-1 overflow-y-auto p-0 m-0">
              <div className="divide-y">
                {conversations
                  .filter((convo) => convo.status === "completed")
                  .map((convo) => (
                    <div
                      key={convo.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                      onClick={() => handleOpenChat(convo.name, convo.country, convo.online)}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`/placeholder.svg?height=48&width=48&text=${convo.name[0]}`}
                            alt={convo.name}
                          />
                          <AvatarFallback>{convo.name[0]}</AvatarFallback>
                        </Avatar>
                        {convo.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{convo.name}</span>
                          <span className="text-xs text-gray-500">{convo.time}</span>
                        </div>
                        <div className="text-xs text-gray-500 truncate">{convo.lastMessage}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            {convo.amount}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
                            {convo.rate}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-800 flex items-center">
                            <Check className="h-2 w-2 mr-0.5" /> Concluído
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {activeChat && (
        <ChatModal
          isOpen={!!activeChat}
          onClose={handleCloseChat}
          recipient={{
            name: activeChat.name,
            country: activeChat.country,
            online: activeChat.online,
          }}
        />
      )}
    </>
  )
}

