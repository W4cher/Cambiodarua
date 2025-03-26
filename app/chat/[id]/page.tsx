"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Send, Paperclip, Smile, MoreVertical, Phone, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface ChatPageProps {
  params: {
    id: string
  }
}

export default function ChatDetailPage({ params }: ChatPageProps) {
  const { id } = params
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "recipient"; time: string }[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Dados do destinatário (em um app real, isso viria de uma API)
  const recipient = {
    id: Number.parseInt(id),
    name: id === "1" ? "Wacher" : id === "2" ? "Marta" : id === "3" ? "João" : "Carlos",
    country: id === "1" ? "Portugal" : id === "2" ? "Brasil" : id === "3" ? "Angola" : "Moçambique",
    online: id === "1" || id === "3" || id === "4",
    avatar: `/placeholder.svg?height=40&width=40&text=${id === "1" ? "W" : id === "2" ? "M" : id === "3" ? "J" : "C"}`,
  }

  // Carregar mensagens iniciais
  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    // Mensagens diferentes para cada conversa
    if (id === "1") {
      setMessages([
        { text: "Olá Wacher, ainda está disponível?", sender: "user", time: "14:25" },
        { text: "Sim, ainda está disponível! Podemos negociar.", sender: "recipient", time: "14:30" },
      ])
    } else if (id === "2") {
      setMessages([
        { text: "Olá Marta, gostaria de negociar o check de 1.000 EUROS.", sender: "user", time: "Ontem" },
        { text: "Claro! Podemos fazer a 1190KZ por Euro.", sender: "recipient", time: "Ontem" },
        { text: "Perfeito, vamos fechar então.", sender: "user", time: "Ontem" },
        { text: "Obrigado pela negociação!", sender: "recipient", time: "Ontem" },
      ])
    } else if (id === "3") {
      setMessages([
        { text: "Olá João, vi seu check de 2.000 EUROS. Qual a melhor taxa?", sender: "user", time: "Seg" },
        { text: "Posso fazer a 1185KZ por Euro.", sender: "recipient", time: "Seg" },
        { text: "Hmm, estava esperando algo melhor.", sender: "user", time: "Seg" },
        { text: "Vou pensar e te aviso mais tarde.", sender: "recipient", time: "Seg" },
      ])
    } else {
      setMessages([{ text: `Olá ${recipient.name}, ainda está disponível?`, sender: "user", time: currentTime }])
    }
  }, [id, recipient.name])

  // Rolar para o final da conversa quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    setMessages([...messages, { text: newMessage, sender: "user", time: currentTime }])
    setNewMessage("")

    // Simular resposta após 1 segundo
    setTimeout(() => {
      const responseTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      const responses = [
        "Sim, claro!",
        "Podemos negociar melhor essa taxa.",
        "Qual seria sua proposta?",
        "Vamos fechar esse negócio!",
        "Prefere transferência ou depósito?",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      setMessages((prev) => [
        ...prev,
        {
          text: randomResponse,
          sender: "recipient",
          time: responseTime,
        },
      ])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-2 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Link href="/chat">
            <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-white">
              <AvatarImage src={recipient.avatar} alt={recipient.name} />
              <AvatarFallback className="text-xs bg-blue-700">{recipient.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">{recipient.name}</div>
              <div className="text-xs flex items-center">
                {recipient.online && <span className="h-1.5 w-1.5 bg-blue-300 rounded-full mr-1"></span>}
                {recipient.country && <span>{recipient.country}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] rounded-lg p-2 ${
                message.sender === "user" ? "bg-blue-100 text-blue-900" : "bg-white text-gray-900"
              }`}
            >
              <div className="text-sm">{message.text}</div>
              <div className="text-[10px] text-gray-500 text-right">{message.time}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-2 border-t flex items-center gap-2 bg-white sticky bottom-0">
        <Button variant="ghost" size="icon" className="text-gray-500 h-8 w-8">
          <Smile className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500 h-8 w-8">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite uma mensagem"
          className="flex-1 h-9 bg-white"
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button
          variant="ghost"
          size="icon"
          className="bg-blue-600 text-white h-8 w-8 hover:bg-blue-700"
          onClick={handleSendMessage}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

