// "use client"

// import type React from "react"

// import { useState, useRef, useEffect } from "react"
// import { Search, Send, Paperclip, Smile, MoreVertical, Phone, Video, Check, Clock, ArrowLeft } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// // Definir conversations fora do componente para evitar recriação a cada renderização
// const conversations = [
//   {
//     id: 1,
//     name: "Wacher",
//     lastMessage: "Sim, ainda está disponível! Podemos negociar.",
//     time: "14:30",
//     unread: 2,
//     country: "Portugal",
//     online: true,
//     amount: "1.000 EUROS",
//     rate: "1190KZ",
//     status: "pending", // pending, completed, cancelled
//   },
//   {
//     id: 2,
//     name: "Marta",
//     lastMessage: "Obrigado pela negociação!",
//     time: "Ontem",
//     unread: 0,
//     country: "Brasil",
//     online: false,
//     amount: "500 EUROS",
//     rate: "595KZ",
//     status: "completed",
//   },
//   {
//     id: 3,
//     name: "João",
//     lastMessage: "Vou pensar e te aviso mais tarde.",
//     time: "Seg",
//     unread: 0,
//     country: "Angola",
//     online: true,
//     amount: "2.000 EUROS",
//     rate: "2380KZ",
//     status: "cancelled",
//   },
//   {
//     id: 4,
//     name: "Carlos",
//     lastMessage: "Qual é o melhor horário para trocarmos?",
//     time: "Hoje",
//     unread: 1,
//     country: "Moçambique",
//     online: true,
//     amount: "300 EUROS",
//     rate: "357KZ",
//     status: "pending",
//   },
// ]

// export default function ChatInterface() {
//   const [activeConversation, setActiveConversation] = useState<number | null>(null)
//   const [messages, setMessages] = useState<{ text: string; sender: "user" | "recipient"; time: string }[]>([])
//   const [newMessage, setNewMessage] = useState("")
//   const messagesEndRef = useRef<HTMLDivElement>(null)
//   const [isMobile, setIsMobile] = useState(false)
//   const [sidebarVisible, setSidebarVisible] = useState(true)

//   // Verificar se é dispositivo móvel
//   useEffect(() => {
//     const checkIfMobile = () => {
//       const mobile = window.innerWidth < 768
//       setIsMobile(mobile)
//       setSidebarVisible(!mobile) // Esconder sidebar automaticamente em dispositivos móveis
//     }

//     // Verificar inicialmente
//     checkIfMobile()

//     // Adicionar listener para redimensionamento
//     window.addEventListener("resize", checkIfMobile)

//     // Cleanup
//     return () => {
//       window.removeEventListener("resize", checkIfMobile)
//     }
//   }, [])

//   // Carregar mensagens quando uma conversa é selecionada
//   useEffect(() => {
//     if (activeConversation !== null) {
//       const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//       const conversation = conversations.find((c) => c.id === activeConversation)

//       if (activeConversation === 1) {
//         setMessages([
//           { text: `Olá ${conversation?.name}, ainda está disponível?`, sender: "user", time: "14:25" },
//           { text: "Sim, ainda está disponível! Podemos negociar.", sender: "recipient", time: "14:30" },
//         ])
//       } else if (activeConversation === 2) {
//         setMessages([
//           {
//             text: `Olá ${conversation?.name}, gostaria de negociar o check de 1.000 EUROS.`,
//             sender: "user",
//             time: "Ontem",
//           },
//           { text: "Claro! Podemos fazer a 1190KZ por Euro.", sender: "recipient", time: "Ontem" },
//           { text: "Perfeito, vamos fechar então.", sender: "user", time: "Ontem" },
//           { text: "Obrigado pela negociação!", sender: "recipient", time: "Ontem" },
//         ])
//       } else if (activeConversation === 3) {
//         setMessages([
//           {
//             text: `Olá ${conversation?.name}, vi seu check de 2.000 EUROS. Qual a melhor taxa?`,
//             sender: "user",
//             time: "Seg",
//           },
//           { text: "Posso fazer a 1185KZ por Euro.", sender: "recipient", time: "Seg" },
//           { text: "Hmm, estava esperando algo melhor.", sender: "user", time: "Seg" },
//           { text: "Vou pensar e te aviso mais tarde.", sender: "recipient", time: "Seg" },
//         ])
//       } else {
//         setMessages([{ text: `Olá ${conversation?.name}, ainda está disponível?`, sender: "user", time: currentTime }])
//       }

//       // Em dispositivos móveis, esconder a lista de conversas quando uma conversa é selecionada
//       if (isMobile) {
//         setSidebarVisible(false)
//       }
//     }
//   }, [activeConversation, isMobile])

//   // Rolar para o final da conversa quando novas mensagens são adicionadas
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "" || activeConversation === null) return

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

//   const getActiveConversation = () => {
//     return conversations.find((c) => c.id === activeConversation) || null
//   }

//   const toggleSidebar = () => {
//     setSidebarVisible(!sidebarVisible)
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto my-4 w-full">
//       <div className="flex h-[600px] relative">
//         {/* Botão para mostrar/esconder sidebar em dispositivos móveis */}
//         {isMobile && activeConversation && (
//           <Button
//             variant="ghost"
//             size="sm"
//             className="absolute top-2 left-2 z-10 h-8 w-8 bg-white shadow-sm rounded-full"
//             onClick={toggleSidebar}
//           >
//             {sidebarVisible ? <ArrowLeft className="h-4 w-4" /> : <Search className="h-4 w-4" />}
//           </Button>
//         )}

//         {/* Lista de conversas (lado esquerdo) */}
//         <div
//           className={`${sidebarVisible ? "block" : "hidden"} ${
//             isMobile ? "absolute inset-0 z-20 bg-white" : "w-2/5"
//           } border-r flex flex-col`}
//         >
//           <div className="p-3 border-b flex items-center justify-between">
//             <Button variant="ghost" size="sm" className="h-8 w-8 mr-2" onClick={() => (window.location.href = "/")}>
//               <ArrowLeft className="h-4 w-4" />
//             </Button>
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <Input placeholder="Pesquisar conversas" className="pl-10 bg-gray-100 border-none" />
//             </div>
//           </div>

//           <Tabs defaultValue="all" className="flex-1 flex flex-col">
//             <TabsList className="w-full grid grid-cols-3 h-10 bg-gray-50 rounded-none">
//               <TabsTrigger value="all" className="text-xs rounded-none">
//                 Todas
//               </TabsTrigger>
//               <TabsTrigger value="pending" className="text-xs rounded-none">
//                 Pendentes
//               </TabsTrigger>
//               <TabsTrigger value="completed" className="text-xs rounded-none">
//                 Concluídas
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="all" className="flex-1 overflow-y-auto p-0 m-0">
//               <div className="divide-y">
//                 {conversations.map((convo) => (
//                   <div
//                     key={convo.id}
//                     className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 ${
//                       activeConversation === convo.id ? "bg-blue-50" : ""
//                     }`}
//                     onClick={() => setActiveConversation(convo.id)}
//                   >
//                     <div className="relative">
//                       <Avatar className="h-12 w-12">
//                         <AvatarImage
//                           src={`/placeholder.svg?height=48&width=48&text=${convo.name[0]}`}
//                           alt={convo.name}
//                         />
//                         <AvatarFallback>{convo.name[0]}</AvatarFallback>
//                       </Avatar>
//                       {convo.online && (
//                         <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
//                       )}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex justify-between items-center">
//                         <span className="font-medium text-sm">{convo.name}</span>
//                         <span className="text-xs text-gray-500">{convo.time}</span>
//                       </div>
//                       <div className="text-xs text-gray-500 truncate">{convo.lastMessage}</div>
//                       <div className="flex items-center gap-1 mt-1">
//                         <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
//                           {convo.amount}
//                         </span>
//                         <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
//                           {convo.rate}
//                         </span>
//                         {convo.status === "completed" && (
//                           <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-800 flex items-center">
//                             <Check className="h-2 w-2 mr-0.5" /> Concluído
//                           </span>
//                         )}
//                         {convo.status === "pending" && (
//                           <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 flex items-center">
//                             <Clock className="h-2 w-2 mr-0.5" /> Pendente
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {convo.unread > 0 && (
//                       <div className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                         {convo.unread}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="pending" className="flex-1 overflow-y-auto p-0 m-0">
//               <div className="divide-y">
//                 {conversations
//                   .filter((convo) => convo.status === "pending")
//                   .map((convo) => (
//                     <div
//                       key={convo.id}
//                       className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 ${
//                         activeConversation === convo.id ? "bg-blue-50" : ""
//                       }`}
//                       onClick={() => setActiveConversation(convo.id)}
//                     >
//                       <div className="relative">
//                         <Avatar className="h-12 w-12">
//                           <AvatarImage
//                             src={`/placeholder.svg?height=48&width=48&text=${convo.name[0]}`}
//                             alt={convo.name}
//                           />
//                           <AvatarFallback>{convo.name[0]}</AvatarFallback>
//                         </Avatar>
//                         {convo.online && (
//                           <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
//                         )}
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <div className="flex justify-between items-center">
//                           <span className="font-medium text-sm">{convo.name}</span>
//                           <span className="text-xs text-gray-500">{convo.time}</span>
//                         </div>
//                         <div className="text-xs text-gray-500 truncate">{convo.lastMessage}</div>
//                         <div className="flex items-center gap-1 mt-1">
//                           <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
//                             {convo.amount}
//                           </span>
//                           <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
//                             {convo.rate}
//                           </span>
//                           <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 flex items-center">
//                             <Clock className="h-2 w-2 mr-0.5" /> Pendente
//                           </span>
//                         </div>
//                       </div>

//                       {convo.unread > 0 && (
//                         <div className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                           {convo.unread}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="completed" className="flex-1 overflow-y-auto p-0 m-0">
//               <div className="divide-y">
//                 {conversations
//                   .filter((convo) => convo.status === "completed")
//                   .map((convo) => (
//                     <div
//                       key={convo.id}
//                       className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 ${
//                         activeConversation === convo.id ? "bg-blue-50" : ""
//                       }`}
//                       onClick={() => setActiveConversation(convo.id)}
//                     >
//                       <div className="relative">
//                         <Avatar className="h-12 w-12">
//                           <AvatarImage
//                             src={`/placeholder.svg?height=48&width=48&text=${convo.name[0]}`}
//                             alt={convo.name}
//                           />
//                           <AvatarFallback>{convo.name[0]}</AvatarFallback>
//                         </Avatar>
//                         {convo.online && (
//                           <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
//                         )}
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <div className="flex justify-between items-center">
//                           <span className="font-medium text-sm">{convo.name}</span>
//                           <span className="text-xs text-gray-500">{convo.time}</span>
//                         </div>
//                         <div className="text-xs text-gray-500 truncate">{convo.lastMessage}</div>
//                         <div className="flex items-center gap-1 mt-1">
//                           <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
//                             {convo.amount}
//                           </span>
//                           <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
//                             {convo.rate}
//                           </span>
//                           <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-800 flex items-center">
//                             <Check className="h-2 w-2 mr-0.5" /> Concluído
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>

//         {/* Área de chat (lado direito) */}
//         <div className={`${isMobile && sidebarVisible ? "hidden" : "flex"} ${isMobile ? "w-full" : "w-3/5"} flex-col`}>
//           {activeConversation ? (
//             <>
//               {/* Header do chat */}
//               <div className="bg-blue-600 text-white p-2 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   {isMobile && (
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="text-white h-8 w-8 hover:bg-blue-700 mr-1"
//                       onClick={toggleSidebar}
//                     >
//                       <ArrowLeft className="h-4 w-4" />
//                     </Button>
//                   )}
//                   <Avatar className="h-8 w-8 border border-white">
//                     <AvatarImage
//                       src={`/placeholder.svg?height=32&width=32&text=${getActiveConversation()?.name[0]}`}
//                       alt={getActiveConversation()?.name}
//                     />
//                     <AvatarFallback className="text-xs bg-blue-700">{getActiveConversation()?.name[0]}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <div className="font-medium text-sm">{getActiveConversation()?.name}</div>
//                     <div className="text-xs flex items-center">
//                       {getActiveConversation()?.online && (
//                         <span className="h-1.5 w-1.5 bg-blue-300 rounded-full mr-1"></span>
//                       )}
//                       {getActiveConversation()?.country && <span>{getActiveConversation()?.country}</span>}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700">
//                     <Phone className="h-4 w-4" />
//                   </Button>
//                   <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700">
//                     <Video className="h-4 w-4" />
//                   </Button>
//                   <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-blue-700">
//                     <MoreVertical className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>

//               {/* Mensagens - Altura fixa para evitar redimensionamento */}
//               <div className="flex-1 overflow-y-auto p-3 bg-gray-100 space-y-2 h-[480px]">
//                 {messages.length > 0 ? (
//                   <>
//                     {messages.map((message, index) => (
//                       <div
//                         key={index}
//                         className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
//                       >
//                         <div
//                           className={`max-w-[70%] rounded-lg p-2 ${
//                             message.sender === "user" ? "bg-blue-100 text-blue-900" : "bg-white text-gray-900"
//                           }`}
//                         >
//                           <div className="text-sm">{message.text}</div>
//                           <div className="text-[10px] text-gray-500 text-right">{message.time}</div>
//                         </div>
//                       </div>
//                     ))}
//                     <div ref={messagesEndRef} />
//                   </>
//                 ) : (
//                   <div className="h-full flex items-center justify-center text-gray-400 text-sm">
//                     Selecione uma conversa para ver as mensagens
//                   </div>
//                 )}
//               </div>

//               {/* Input de mensagem */}
//               <div className="p-2 border-t flex items-center gap-2 bg-gray-50">
//                 <Button variant="ghost" size="icon" className="text-gray-500 h-8 w-8">
//                   <Smile className="h-5 w-5" />
//                 </Button>
//                 <Button variant="ghost" size="icon" className="text-gray-500 h-8 w-8">
//                   <Paperclip className="h-5 w-5" />
//                 </Button>
//                 <Input
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Digite uma mensagem"
//                   className="flex-1 h-9 bg-white"
//                   onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//                 />
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="bg-blue-600 text-white h-8 w-8 hover:bg-blue-700"
//                   onClick={handleSendMessage}
//                 >
//                   <Send className="h-4 w-4" />
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6 h-[600px]">
//               <div className="bg-blue-100 rounded-full p-6 mb-4">
//                 <MessageIcon className="h-12 w-12 text-blue-600" />
//               </div>
//               <h3 className="text-xl font-medium text-gray-800 mb-2">Suas conversas</h3>
//               <p className="text-gray-500 text-center max-w-xs">
//                 {isMobile
//                   ? "Toque no botão de menu para ver suas conversas"
//                   : "Selecione uma conversa à esquerda para começar a negociar ou continue navegando nas ofertas disponíveis."}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// // Componente de ícone de mensagem
// function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//     </svg>
//   )
// }

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, Send, Paperclip, Smile, MoreVertical, Phone, Video, Check, Clock, ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { connectSocket, getSocket } from "@/services/socket"
import { Socket } from "socket.io-client"

// Define message type
interface Message {
  text: string;
  sender: "user" | "recipient";
  time: string;
  id?: string;
}

// Define conversation type
interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  country: string;
  online: boolean;
  amount: string;
  rate: string;
  status: "pending" | "completed" | "cancelled";
  transactionId?: string;
  buyerId?: string;
}

// Definir conversations fora do componente para evitar recriação a cada renderização
const conversations: Conversation[] = [
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
    status: "pending",
    transactionId: "t123456",
    buyerId: "b123456"
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
    transactionId: "t234567",
    buyerId: "b234567"
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
    transactionId: "t345678",
    buyerId: "b345678"
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
    transactionId: "t456789",
    buyerId: "b456789"
  },
]

export default function ChatInterface() {
  const [activeConversation, setActiveConversation] = useState<number | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  // Obter token do localStorage e inicializar socket
  useEffect(() => {
    // Em um ambiente real, você buscaria o token do localStorage ou de um gerenciador de estado
    const storedToken = localStorage.getItem("token") || "sample-token-for-testing";
    setToken(storedToken);

    if (storedToken) {
      const socketInstance = connectSocket(storedToken);
      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        console.log("Socket connected");
        setIsConnected(true);
      });

      socketInstance.on("disconnect", () => {
        console.log("Socket disconnected");
        setIsConnected(false);
      });

      socketInstance.on("error", (error) => {
        console.error("Socket error:", error);
      });

      // Tratamento de novas mensagens
      socketInstance.on("newMessage", (message) => {
        const formattedMessage: Message = {
          text: message.content,
          sender: message.sender === localStorage.getItem("userId") ? "user" : "recipient",
          time: new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          id: message._id
        };

        setMessages((prevMessages) => [...prevMessages, formattedMessage]);
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, []);

  // Verificar se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setSidebarVisible(!mobile) // Esconder sidebar automaticamente em dispositivos móveis
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

  // Carregar mensagens quando uma conversa é selecionada
  useEffect(() => {
    if (activeConversation !== null) {
      const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      const conversation = conversations.find((c) => c.id === activeConversation)

      if (!conversation) return;

      // Entrar na sala de chat quando uma conversa é selecionada
      if (socket && isConnected && conversation.transactionId && conversation.buyerId) {
        socket.emit("joinChat", {
          transactionId: conversation.transactionId,
          buyerId: conversation.buyerId
        });
        
        // Aqui você poderia fazer uma chamada para buscar mensagens anteriores da API
        // Por enquanto, vamos carregar mensagens simuladas
        loadDemoMessages(activeConversation);
      }

      // Em dispositivos móveis, esconder a lista de conversas quando uma conversa é selecionada
      if (isMobile) {
        setSidebarVisible(false)
      }
    }
  }, [activeConversation, isMobile, socket, isConnected])

  // Função para carregar mensagens de demonstração
  const loadDemoMessages = (convoId: number) => {
    const conversation = conversations.find((c) => c.id === convoId);
    
    if (convoId === 1) {
      setMessages([
        { text: `Olá ${conversation?.name}, ainda está disponível?`, sender: "user", time: "14:25" },
        { text: "Sim, ainda está disponível! Podemos negociar.", sender: "recipient", time: "14:30" },
      ]);
    } else if (convoId === 2) {
      setMessages([
        {
          text: `Olá ${conversation?.name}, gostaria de negociar o check de 1.000 EUROS.`,
          sender: "user",
          time: "Ontem",
        },
        { text: "Claro! Podemos fazer a 1190KZ por Euro.", sender: "recipient", time: "Ontem" },
        { text: "Perfeito, vamos fechar então.", sender: "user", time: "Ontem" },
        { text: "Obrigado pela negociação!", sender: "recipient", time: "Ontem" },
      ]);
    } else if (convoId === 3) {
      setMessages([
        {
          text: `Olá ${conversation?.name}, vi seu check de 2.000 EUROS. Qual a melhor taxa?`,
          sender: "user",
          time: "Seg",
        },
        { text: "Posso fazer a 1185KZ por Euro.", sender: "recipient", time: "Seg" },
        { text: "Hmm, estava esperando algo melhor.", sender: "user", time: "Seg" },
        { text: "Vou pensar e te aviso mais tarde.", sender: "recipient", time: "Seg" },
      ]);
    } else {
      setMessages([{ text: `Olá ${conversation?.name}, ainda está disponível?`, sender: "user", time: currentTime }]);
    }
  };

  // Rolar para o final da conversa quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || activeConversation === null) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const conversation = conversations.find((c) => c.id === activeConversation);
    
    // Adicionar mensagem à UI imediatamente
    setMessages([...messages, { text: newMessage, sender: "user", time: currentTime }]);
    
    // Enviar a mensagem via socket se conectado
    if (socket && isConnected && conversation?.transactionId && conversation?.buyerId) {
      socket.emit("sendMessage", {
        transactionId: conversation.transactionId,
        buyerId: conversation.buyerId,
        content: newMessage
      });
    } else {
      console.log("Socket não conectado ou informações de conversa incompletas");
      
      // Simulação de resposta para quando o socket não está disponível
      setTimeout(() => {
        const responseTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const responses = [
          "Sim, claro!",
          "Podemos negociar melhor essa taxa.",
          "Qual seria sua proposta?",
          "Vamos fechar esse negócio!",
          "Prefere transferência ou depósito?",
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        setMessages((prev) => [
          ...prev,
          {
            text: randomResponse,
            sender: "recipient",
            time: responseTime,
          },
        ]);
      }, 1000);
    }
    
    setNewMessage("");
  }

  const getActiveConversation = () => {
    return conversations.find((c) => c.id === activeConversation) || null
  }

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  // Função para atualizar os dados de leitura
  const markAsRead = (convoId: number) => {
    // Em um ambiente real, você enviaria esta atualização para o servidor
    console.log(`Marcando conversa ${convoId} como lida`);
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto my-4 w-full">
      <div className="flex h-[600px] relative">
        {/* Status de conexão do socket */}
        <div className={`absolute top-0 right-0 z-30 m-2 text-xs px-2 py-1 rounded-full ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isConnected ? 'Online' : 'Offline'}
        </div>
        
        {/* Botão para mostrar/esconder sidebar em dispositivos móveis */}
        {isMobile && activeConversation && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 left-2 z-10 h-8 w-8 bg-white shadow-sm rounded-full"
            onClick={toggleSidebar}
          >
            {sidebarVisible ? <ArrowLeft className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </Button>
        )}

        {/* Lista de conversas (lado esquerdo) */}
        <div
          className={`${sidebarVisible ? "block" : "hidden"} ${
            isMobile ? "absolute inset-0 z-20 bg-white" : "w-2/5"
          } border-r flex flex-col`}
        >
          <div className="p-3 border-b flex items-center justify-between">
            <Button variant="ghost" size="sm" className="h-8 w-8 mr-2" onClick={() => (window.location.href = "/")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Pesquisar conversas" className="pl-10 bg-gray-100 border-none" />
            </div>
          </div>

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
                    className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 ${
                      activeConversation === convo.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => {
                      setActiveConversation(convo.id);
                      if (convo.unread > 0) {
                        markAsRead(convo.id);
                      }
                    }}
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
                      className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 ${
                        activeConversation === convo.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        setActiveConversation(convo.id);
                        if (convo.unread > 0) {
                          markAsRead(convo.id);
                        }
                      }}
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
                      className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 ${
                        activeConversation === convo.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => setActiveConversation(convo.id)}
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

        {/* Área de chat (lado direito) */}
        <div className={`${isMobile && sidebarVisible ? "hidden" : "flex"} ${isMobile ? "w-full" : "w-3/5"} flex-col`}>
          {activeConversation ? (
            <>
              {/* Header do chat */}
              <div className="bg-blue-600 text-white p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white h-8 w-8 hover:bg-blue-700 mr-1"
                      onClick={toggleSidebar}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  )}
                  <Avatar className="h-8 w-8 border border-white">
                    <AvatarImage
                      src={`/placeholder.svg?height=32&width=32&text=${getActiveConversation()?.name[0]}`}
                      alt={getActiveConversation()?.name}
                    />
                    <AvatarFallback className="text-xs bg-blue-700">{getActiveConversation()?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{getActiveConversation()?.name}</div>
                    <div className="text-xs flex items-center">
                      {getActiveConversation()?.online && (
                        <span className="h-1.5 w-1.5 bg-blue-300 rounded-full mr-1"></span>
                      )}
                      {getActiveConversation()?.country && <span>{getActiveConversation()?.country}</span>}
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
              </div>

              {/* Mensagens - Altura fixa para evitar redimensionamento */}
              <div className="flex-1 overflow-y-auto p-3 bg-gray-100 space-y-2 h-[480px]">
                {messages.length > 0 ? (
                  <>
                    {messages.map((message, index) => (
                      <div
                        key={message.id || index}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
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
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    Selecione uma conversa para ver as mensagens
                  </div>
                )}
              </div>

              {/* Input de mensagem */}
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
                  disabled={!isConnected && !activeConversation}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6 h-[600px]">
              <div className="bg-blue-100 rounded-full p-6 mb-4">
                <MessageIcon className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Suas conversas</h3>
              <p className="text-gray-500 text-center max-w-xs">
                {isMobile
                  ? "Toque no botão de menu para ver suas conversas"
                  : "Selecione uma conversa à esquerda para começar a negociar ou continue navegando nas ofertas disponíveis."}
              </p>
              {!isConnected && (
                <div className="mt-4 p-2 bg-red-100 text-red-800 rounded-lg text-xs text-center">
                  Você está offline. Verifique sua conexão.
                </div>
              )}
            </div>
          )}
        </div>
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
