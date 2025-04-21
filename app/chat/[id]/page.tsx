// "use client"

// import { useState, useRef, useEffect } from "react"
// import { ArrowLeft, Send, Paperclip, Smile, MoreVertical, Phone, Video } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import Link from "next/link"

// interface ChatPageProps {
//   params: {
//     id: string
//   }
// }

// export default function ChatDetailPage({ params }: ChatPageProps) {
//   const { id } = params
//   const [messages, setMessages] = useState<{ text: string; sender: "user" | "recipient"; time: string }[]>([])
//   const [newMessage, setNewMessage] = useState("")
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   // Dados do destinatário (em um app real, isso viria de uma API)
//   const recipient = {
//     id: Number.parseInt(id),
//     name: id === "1" ? "Wacher" : id === "2" ? "Marta" : id === "3" ? "João" : "Carlos",
//     country: id === "1" ? "Portugal" : id === "2" ? "Brasil" : id === "3" ? "Angola" : "Moçambique",
//     online: id === "1" || id === "3" || id === "4",
//     avatar: `/placeholder.svg?height=40&width=40&text=${id === "1" ? "W" : id === "2" ? "M" : id === "3" ? "J" : "C"}`,
//   }

//   // Carregar mensagens iniciais
//   useEffect(() => {
//     const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

//     // Mensagens diferentes para cada conversa
//     if (id === "1") {
//       setMessages([
//         { text: "Olá Wacher, ainda está disponível?", sender: "user", time: "14:25" },
//         { text: "Sim, ainda está disponível! Podemos negociar.", sender: "recipient", time: "14:30" },
//       ])
//     } else if (id === "2") {
//       setMessages([
//         { text: "Olá Marta, gostaria de negociar o check de 1.000 EUROS.", sender: "user", time: "Ontem" },
//         { text: "Claro! Podemos fazer a 1190KZ por Euro.", sender: "recipient", time: "Ontem" },
//         { text: "Perfeito, vamos fechar então.", sender: "user", time: "Ontem" },
//         { text: "Obrigado pela negociação!", sender: "recipient", time: "Ontem" },
//       ])
//     } else if (id === "3") {
//       setMessages([
//         { text: "Olá João, vi seu check de 2.000 EUROS. Qual a melhor taxa?", sender: "user", time: "Seg" },
//         { text: "Posso fazer a 1185KZ por Euro.", sender: "recipient", time: "Seg" },
//         { text: "Hmm, estava esperando algo melhor.", sender: "user", time: "Seg" },
//         { text: "Vou pensar e te aviso mais tarde.", sender: "recipient", time: "Seg" },
//       ])
//     } else {
//       setMessages([{ text: `Olá ${recipient.name}, ainda está disponível?`, sender: "user", time: currentTime }])
//     }
//   }, [id, recipient.name])

//   // Rolar para o final da conversa quando novas mensagens são adicionadas
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "") return

//     const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//     setMessages([...messages, { text: newMessage, sender: "user", time: currentTime }])
//     setNewMessage("")

//     // Simular resposta após 1 segundo
//     setTimeout(() => {
//       const responseTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//       const responses = [
//         "Sim, claro!",
//         "Podemos negociar melhor essa taxa.",
//         "Qual seria sua proposta?",
//         "Vamos fechar esse negócio!",
//         "Prefere transferência ou depósito?",
//       ]
//       const randomResponse = responses[Math.floor(Math.random() * responses.length)]

//       setMessages((prev) => [
//         ...prev,
//         {
//           text: randomResponse,
//           sender: "recipient",
//           time: responseTime,
//         },
//       ])
//     }, 1000)
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Header */}
//       <header className="bg-blue-600 text-white p-2 flex items-center justify-between sticky top-0 z-10">
//         <div className="flex items-center gap-2">
//           <Link href="/chat">
//             <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700">
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//           </Link>

//           <div className="flex items-center gap-2">
//             <Avatar className="h-8 w-8 border border-white">
//               <AvatarImage src={recipient.avatar} alt={recipient.name} />
//               <AvatarFallback className="text-xs bg-blue-700">{recipient.name[0]}</AvatarFallback>
//             </Avatar>
//             <div>
//               <div className="font-medium text-sm">{recipient.name}</div>
//               <div className="text-xs flex items-center">
//                 {recipient.online && <span className="h-1.5 w-1.5 bg-blue-300 rounded-full mr-1"></span>}
//                 {recipient.country && <span>{recipient.country}</span>}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700">
//             <Phone className="h-4 w-4" />
//           </Button>
//           <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700">
//             <Video className="h-4 w-4" />
//           </Button>
//           <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700">
//             <MoreVertical className="h-4 w-4" />
//           </Button>
//         </div>
//       </header>

//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-3 space-y-2">
//         {messages.map((message, index) => (
//           <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
//             <div
//               className={`max-w-[70%] rounded-lg p-2 ${
//                 message.sender === "user" ? "bg-blue-100 text-blue-900" : "bg-white text-gray-900"
//               }`}
//             >
//               <div className="text-sm">{message.text}</div>
//               <div className="text-[10px] text-gray-500 text-right">{message.time}</div>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="p-2 border-t flex items-center gap-2 bg-white sticky bottom-0">
//         <Button variant="ghost" size="icon" className="text-gray-500 h-8 w-8">
//           <Smile className="h-5 w-5" />
//         </Button>
//         <Button variant="ghost" size="icon" className="text-gray-500 h-8 w-8">
//           <Paperclip className="h-5 w-5" />
//         </Button>
//         <Input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Digite uma mensagem"
//           className="flex-1 h-9 bg-white"
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <Button
//           variant="ghost"
//           size="icon"
//           className="bg-blue-600 text-white h-8 w-8 hover:bg-blue-700"
//           onClick={handleSendMessage}
//         >
//           <Send className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   )
// }

"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Send, PaperclipIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { getSocket } from "@/services/socket"

export default function ChatDetailPage() {
  const params = useParams()
  const chatId = params.id
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Fetch chat data and connect to socket
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        setIsLoading(true)
        // In a real app, fetch this from API
        // For now using dummy data
        const dummyChats = [
          {
            id: 1,
            name: "Wacher",
            status: "online",
            transactionId: "t123",
            buyerId: "b456",
            messages: [
              {
                id: 1,
                sender: "b456",
                content: "Olá, estou interessado na transação.",
                timestamp: "2023-04-18T10:30:00Z",
                isRead: true
              },
              {
                id: 2,
                sender: "currentUser", // This would be the current user's ID
                content: "Sim, ainda está disponível! Podemos negociar.",
                timestamp: "2023-04-18T10:35:00Z",
                isRead: true
              }
            ]
          },
          {
            id: 2,
            name: "Marta",
            status: "offline",
            transactionId: "t124",
            buyerId: "b457",
            messages: [
              {
                id: 1,
                sender: "b457",
                content: "Boa tarde, ainda tem disponível?",
                timestamp: "2023-04-15T14:20:00Z",
                isRead: true
              },
              {
                id: 2,
                sender: "currentUser",
                content: "Sim, tenho. Podemos negociar o preço.",
                timestamp: "2023-04-15T14:22:00Z",
                isRead: true
              },
              {
                id: 3,
                sender: "b457",
                content: "Obrigado pela negociação!",
                timestamp: "2023-04-15T14:30:00Z",
                isRead: true
              }
            ]
          },
          {
            id: 3,
            name: "João",
            status: "online",
            transactionId: "t125",
            buyerId: "b458",
            messages: [
              {
                id: 1,
                sender: "b458",
                content: "Esse valor é fixo ou tem negociação?",
                timestamp: "2023-04-14T09:15:00Z",
                isRead: true
              },
              {
                id: 2,
                sender: "currentUser",
                content: "Podemos negociar um pouco, qual seria sua oferta?",
                timestamp: "2023-04-14T09:20:00Z",
                isRead: true
              },
              {
                id: 3,
                sender: "b458",
                content: "Vou pensar e te aviso mais tarde.",
                timestamp: "2023-04-14T09:25:00Z",
                isRead: true
              }
            ]
          },
          {
            id: 4,
            name: "Carlos",
            status: "online",
            transactionId: "t126",
            buyerId: "b459",
            messages: [
              {
                id: 1,
                sender: "b459",
                content: "Olá, tenho interesse na transação.",
                timestamp: "2023-04-19T08:10:00Z",
                isRead: true
              },
              {
                id: 2,
                sender: "currentUser",
                content: "Ótimo! Podemos definir os detalhes.",
                timestamp: "2023-04-19T08:15:00Z",
                isRead: true
              },
              {
                id: 3,
                sender: "b459",
                content: "Qual é o melhor horário para trocarmos?",
                timestamp: "2023-04-19T08:20:00Z",
                isRead: false
              }
            ]
          }
        ]

        const chat = dummyChats.find(c => c.id.toString() === chatId)
        
        if (!chat) {
          setError("Conversa não encontrada")
          return
        }
        
        setCurrentChat(chat)
        setMessages(chat.messages)
        
        // Join the chat room
        try {
          const socket = getSocket()
          socket.emit("joinChat", {
            transactionId: chat.transactionId,
            buyerId: chat.buyerId
          })
          
          // Listen for new messages
          socket.on("newMessage", (message) => {
            setMessages((prevMessages) => [...prevMessages, message])
          })
          
          // Cleanup
          return () => {
            socket.off("newMessage")
          }
        } catch (err) {
          console.error("Socket error:", err)
          setError("Erro ao conectar ao chat")
        }
      } catch (err) {
        console.error("Error fetching chat:", err)
        setError("Erro ao carregar conversa")
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchChatData()
  }, [chatId])
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  // Send message
  const sendMessage = (e) => {
    e.preventDefault()
    
    if (!message.trim()) return
    
    try {
      const socket = getSocket()
      
      // New message object
      const newMessage = {
        id: Date.now(), // temporary ID for UI
        sender: "currentUser",
        content: message,
        timestamp: new Date().toISOString(),
        isRead: false
      }
      
      // Add to local state immediately for better UX
      setMessages((prevMessages) => [...prevMessages, newMessage])
      
      // Send via socket
      socket.emit("sendMessage", {
        transactionId: currentChat.transactionId,
        buyerId: currentChat.buyerId,
        content: message
      })
      
      // Clear input
      setMessage("")
    } catch (err) {
      console.error("Error sending message:", err)
      setError("Erro ao enviar mensagem")
    }
  }
  
  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => router.push('/chat')}>Voltar para conversas</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white py-2 px-4 border-b flex items-center gap-3 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <Link href="/chat">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={`/placeholder.svg?height=32&width=32&text=${currentChat.name[0]}`}
            alt={currentChat.name}
          />
          <AvatarFallback>{currentChat.name[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h1 className="text-base font-medium">{currentChat.name}</h1>
          <p className="text-xs text-gray-500">
            {currentChat.status === "online" ? (
              <span className="text-green-500">●&nbsp;Online</span>
            ) : (
              <span className="text-gray-500">●&nbsp;Offline</span>
            )}
          </p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 pt-14 pb-16 px-4 overflow-y-auto">
        <div className="max-w-lg mx-auto space-y-4 py-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "currentUser" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.sender === "currentUser"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 border"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs text-right mt-1 opacity-70">
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white py-2 px-4 border-t fixed bottom-0 left-0 right-0">
        <form onSubmit={sendMessage} className="flex items-center gap-2 max-w-lg mx-auto">
          <Button type="button" variant="ghost" size="icon" className="h-10 w-10 shrink-0">
            <PaperclipIcon className="h-5 w-5" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="h-10 w-10 shrink-0 bg-blue-600 hover:bg-blue-700">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}