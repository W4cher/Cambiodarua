"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Paperclip, Smile, MoreVertical, Phone, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
  recipient: {
    name: string
    avatar?: string
    country?: string
    online?: boolean
  }
}

export default function ChatModal({ isOpen, onClose, recipient }: ChatModalProps) {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "recipient"; time: string }[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Adicionar mensagem automática quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      setMessages([
        {
          text: `Olá ${recipient.name}, ainda está disponível?`,
          sender: "user",
          time: currentTime,
        },
      ])
    }
  }, [isOpen, recipient.name])

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
      setMessages((prev) => [
        ...prev,
        {
          text: "Sim, ainda está disponível! Podemos negociar.",
          sender: "recipient",
          time: responseTime,
        },
      ])
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md flex flex-col h-[500px] max-h-[90vh]">
        {/* Header - Alterado para azul */}
        <div className="bg-blue-600 text-white p-2 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-white">
              <AvatarImage src={recipient.avatar || "/placeholder.svg?height=32&width=32"} alt={recipient.name} />
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
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700">
              <MoreVertical className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 bg-gray-100 space-y-2">
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
        <div className="p-2 border-t flex items-center gap-2 bg-gray-50">
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
    </div>
  )
}
