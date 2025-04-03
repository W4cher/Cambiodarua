"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, Send, Paperclip, Smile, Phone, Video, MoreVertical, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados de exemplo para conversas de suporte
const supportChats = [
  {
    id: 1,
    user: {
      id: 1,
      name: "João Silva",
      email: "joao.silva@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
    },
    status: "active",
    lastMessage: "Olá, estou com um problema para concluir uma transação.",
    lastMessageTime: "2023-04-01T10:23:14",
    unread: true,
    category: "transaction",
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=MO",
    },
    status: "active",
    lastMessage: "Preciso de ajuda para verificar minha conta.",
    lastMessageTime: "2023-04-01T09:45:22",
    unread: false,
    category: "account",
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "Carlos Santos",
      email: "carlos.santos@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=CS",
    },
    status: "closed",
    lastMessage: "Obrigado pela ajuda!",
    lastMessageTime: "2023-03-31T14:12:05",
    unread: false,
    category: "general",
  },
  {
    id: 4,
    user: {
      id: 4,
      name: "Ana Pereira",
      email: "ana.pereira@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=AP",
    },
    status: "pending",
    lastMessage: "Como posso criar um novo check?",
    lastMessageTime: "2023-03-30T16:30:45",
    unread: true,
    category: "check",
  },
  {
    id: 5,
    user: {
      id: 5,
      name: "Pedro Costa",
      email: "pedro.costa@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=PC",
    },
    status: "active",
    lastMessage: "Minha transação está pendente há mais de 24 horas.",
    lastMessageTime: "2023-03-29T11:05:33",
    unread: true,
    category: "transaction",
  },
]

// Mensagens de exemplo para uma conversa
const exampleMessages = [
  {
    id: 1,
    sender: "user",
    text: "Olá, estou com um problema para concluir uma transação.",
    time: "2023-04-01T10:23:14",
  },
  {
    id: 2,
    sender: "admin",
    text: "Olá João, obrigado por entrar em contato. Pode me fornecer mais detalhes sobre o problema que está enfrentando?",
    time: "2023-04-01T10:25:30",
  },
  {
    id: 3,
    sender: "user",
    text: "Estou tentando concluir a transação #1001, mas recebo um erro dizendo que o pagamento não pôde ser processado.",
    time: "2023-04-01T10:27:45",
  },
  {
    id: 4,
    sender: "admin",
    text: "Entendi. Vou verificar essa transação no sistema. Pode me informar qual método de pagamento está utilizando?",
    time: "2023-04-01T10:30:12",
  },
  {
    id: 5,
    sender: "user",
    text: "Estou tentando fazer uma transferência bancária do BAI para o Santander.",
    time: "2023-04-01T10:32:05",
  },
]

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedChat, setSelectedChat] = useState<any | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filtrar conversas com base nos filtros aplicados
  const filteredChats = supportChats.filter((chat) => {
    // Filtro de pesquisa
    const matchesSearch =
      chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de status
    const matchesStatus = statusFilter === "all" || chat.status === statusFilter

    // Filtro de categoria
    const matchesCategory = categoryFilter === "all" || chat.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Carregar mensagens quando uma conversa é selecionada
  useEffect(() => {
    if (selectedChat) {
      // Em um app real, você buscaria as mensagens da API
      setMessages(exampleMessages)
    }
  }, [selectedChat])

  // Rolar para o final da conversa quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedChat) return

    const currentTime = new Date().toISOString()
    const newMsg = {
      id: messages.length + 1,
      sender: "admin",
      text: newMessage,
      time: currentTime,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"

    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      // Hoje - mostrar hora
      return new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    } else if (diffDays === 1) {
      // Ontem
      return "Ontem"
    } else if (diffDays < 7) {
      // Esta semana - mostrar dia da semana
      return new Intl.DateTimeFormat("pt-BR", {
        weekday: "short",
      }).format(date)
    } else {
      // Mais de uma semana - mostrar data completa
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Suporte ao Cliente</h1>
          <p className="text-muted-foreground">Gerencie as conversas de suporte com os usuários</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de conversas */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Conversas</CardTitle>
            <CardDescription>{filteredChats.length} conversas de suporte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 mb-4">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar conversas..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                    <SelectItem value="closed">Fechados</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filtrar por categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  <SelectItem value="account">Conta</SelectItem>
                  <SelectItem value="transaction">Transação</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="general">Geral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="unread">Não lidas</TabsTrigger>
                <TabsTrigger value="active">Ativas</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <div className="space-y-2">
                  {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChat?.id === chat.id
                            ? "bg-blue-50"
                            : chat.unread
                              ? "bg-gray-50 hover:bg-gray-100"
                              : "bg-white hover:bg-gray-50"
                        } ${chat.unread ? "border-l-4 border-blue-500" : "border"}`}
                        onClick={() => setSelectedChat(chat)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
                            <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-sm">{chat.user.name}</span>
                              <span className="text-xs text-gray-500">{formatDate(chat.lastMessageTime)}</span>
                            </div>
                            <div className="text-xs text-gray-500 truncate">{chat.lastMessage}</div>
                            <div className="flex items-center gap-1 mt-1">
                              <Badge
                                variant="outline"
                                className={
                                  chat.status === "active"
                                    ? "border-green-500 text-green-500"
                                    : chat.status === "pending"
                                      ? "border-yellow-500 text-yellow-500"
                                      : "border-gray-500 text-gray-500"
                                }
                              >
                                {chat.status === "active"
                                  ? "Ativo"
                                  : chat.status === "pending"
                                    ? "Pendente"
                                    : "Fechado"}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {chat.category === "account"
                                  ? "Conta"
                                  : chat.category === "transaction"
                                    ? "Transação"
                                    : chat.category === "check"
                                      ? "Check"
                                      : "Geral"}
                              </Badge>
                            </div>
                          </div>
                          {chat.unread && (
                            <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              1
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Nenhuma conversa encontrada com os filtros aplicados.
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="unread" className="mt-4">
                <div className="space-y-2">
                  {filteredChats.filter((chat) => chat.unread).length > 0 ? (
                    filteredChats
                      .filter((chat) => chat.unread)
                      .map((chat) => (
                        <div
                          key={chat.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedChat?.id === chat.id ? "bg-blue-50" : "bg-gray-50 hover:bg-gray-100"
                          } border-l-4 border-blue-500`}
                          onClick={() => setSelectedChat(chat)}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
                              <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-sm">{chat.user.name}</span>
                                <span className="text-xs text-gray-500">{formatDate(chat.lastMessageTime)}</span>
                              </div>
                              <div className="text-xs text-gray-500 truncate">{chat.lastMessage}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <Badge
                                  variant="outline"
                                  className={
                                    chat.status === "active"
                                      ? "border-green-500 text-green-500"
                                      : chat.status === "pending"
                                        ? "border-yellow-500 text-yellow-500"
                                        : "border-gray-500 text-gray-500"
                                  }
                                >
                                  {chat.status === "active"
                                    ? "Ativo"
                                    : chat.status === "pending"
                                      ? "Pendente"
                                      : "Fechado"}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {chat.category === "account"
                                    ? "Conta"
                                    : chat.category === "transaction"
                                      ? "Transação"
                                      : chat.category === "check"
                                        ? "Check"
                                        : "Geral"}
                                </Badge>
                              </div>
                            </div>
                            <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              1
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">Nenhuma conversa não lida encontrada.</div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="active" className="mt-4">
                <div className="space-y-2">
                  {filteredChats.filter((chat) => chat.status === "active").length > 0 ? (
                    filteredChats
                      .filter((chat) => chat.status === "active")
                      .map((chat) => (
                        <div
                          key={chat.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedChat?.id === chat.id
                              ? "bg-blue-50"
                              : chat.unread
                                ? "bg-gray-50 hover:bg-gray-100"
                                : "bg-white hover:bg-gray-50"
                          } ${chat.unread ? "border-l-4 border-blue-500" : "border"}`}
                          onClick={() => setSelectedChat(chat)}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
                              <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-sm">{chat.user.name}</span>
                                <span className="text-xs text-gray-500">{formatDate(chat.lastMessageTime)}</span>
                              </div>
                              <div className="text-xs text-gray-500 truncate">{chat.lastMessage}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <Badge variant="outline" className="border-green-500 text-green-500">
                                  Ativo
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {chat.category === "account"
                                    ? "Conta"
                                    : chat.category === "transaction"
                                      ? "Transação"
                                      : chat.category === "check"
                                        ? "Check"
                                        : "Geral"}
                                </Badge>
                              </div>
                            </div>
                            {chat.unread && (
                              <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                1
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">Nenhuma conversa ativa encontrada.</div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Área de chat */}
        <Card className="lg:col-span-2">
          {selectedChat ? (
            <div className="flex flex-col h-[600px]">
              {/* Header do chat */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedChat.user.avatar} alt={selectedChat.user.name} />
                    <AvatarFallback>{selectedChat.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedChat.user.name}</div>
                    <div className="text-xs text-gray-500">{selectedChat.user.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      selectedChat.status === "active"
                        ? "border-green-500 text-green-500"
                        : selectedChat.status === "pending"
                          ? "border-yellow-500 text-yellow-500"
                          : "border-gray-500 text-gray-500"
                    }
                  >
                    {selectedChat.status === "active"
                      ? "Ativo"
                      : selectedChat.status === "pending"
                        ? "Pendente"
                        : "Fechado"}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Mensagens */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "user" && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src={selectedChat.user.avatar} alt={selectedChat.user.name} />
                        <AvatarFallback>{selectedChat.user.name[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "admin" ? "bg-blue-500 text-white" : "bg-white border border-gray-200"
                      }`}
                    >
                      <div className="text-sm">{message.text}</div>
                      <div
                        className={`text-xs ${
                          message.sender === "admin" ? "text-blue-100" : "text-gray-500"
                        } text-right mt-1`}
                      >
                        {formatDate(message.time)}
                      </div>
                    </div>
                    {message.sender === "admin" && (
                      <Avatar className="h-8 w-8 ml-2 mt-1">
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=A" alt="Admin" />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input de mensagem */}
              <div className="p-4 border-t flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite uma mensagem..."
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button className="bg-blue-500 hover:bg-blue-600" size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-[600px] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <MessageIcon className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Selecione uma conversa</h3>
              <p className="text-gray-500 max-w-md">
                Selecione uma conversa na lista à esquerda para visualizar as mensagens e responder ao usuário.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

// Componente de ícone de mensagem
function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

