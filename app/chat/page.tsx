// "use client"
// import { ArrowLeft, Search, Filter, Plus } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useRouter } from "next/navigation"
// import Link from "next/link"

// export default function ChatPage() {
//   const router = useRouter()

//   const conversations = [
//     {
//       id: 1,
//       name: "Wacher",
//       lastMessage: "Sim, ainda está disponível! Podemos negociar.",
//       time: "14:30",
//       unread: 2,
//       country: "Portugal",
//       online: true,
//       amount: "1.000 EUROS",
//       rate: "1190KZ",
//       status: "pending", // pending, completed, cancelled
//     },
//     {
//       id: 2,
//       name: "Marta",
//       lastMessage: "Obrigado pela negociação!",
//       time: "Ontem",
//       unread: 0,
//       country: "Brasil",
//       online: false,
//       amount: "500 EUROS",
//       rate: "595KZ",
//       status: "completed",
//     },
//     {
//       id: 3,
//       name: "João",
//       lastMessage: "Vou pensar e te aviso mais tarde.",
//       time: "Seg",
//       unread: 0,
//       country: "Angola",
//       online: true,
//       amount: "2.000 EUROS",
//       rate: "2380KZ",
//       status: "cancelled",
//     },
//     {
//       id: 4,
//       name: "Carlos",
//       lastMessage: "Qual é o melhor horário para trocarmos?",
//       time: "Hoje",
//       unread: 1,
//       country: "Moçambique",
//       online: true,
//       amount: "300 EUROS",
//       rate: "357KZ",
//       status: "pending",
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white py-2 px-4 border-b flex items-center gap-3 fixed top-0 left-0 right-0 z-50 shadow-sm">
//         <Link href="/">
//           <Button variant="ghost" size="icon" className="h-8 w-8">
//             <ArrowLeft className="h-5 w-5" />
//           </Button>
//         </Link>
//         <h1 className="text-lg font-bold">Conversas</h1>
//       </header>

//       {/* Main Content */}
//       <div className="pt-14 pb-16 px-4">
//         {/* Search and Filter */}
//         <div className="flex items-center gap-2 mb-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input className="pl-9 py-2 bg-white" placeholder="Pesquisar conversas" />
//           </div>
//           <Button variant="outline" size="icon" className="h-10 w-10">
//             <Filter className="h-4 w-4" />
//           </Button>
//         </div>

//         {/* Tabs */}
//         <Tabs defaultValue="all" className="w-full">
//           <TabsList className="w-full grid grid-cols-3 h-10 bg-white rounded-md mb-4">
//             <TabsTrigger value="all" className="text-sm rounded-none">
//               Todas
//             </TabsTrigger>
//             <TabsTrigger value="pending" className="text-sm rounded-none">
//               Pendentes
//             </TabsTrigger>
//             <TabsTrigger value="completed" className="text-sm rounded-none">
//               Concluídas
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="all" className="mt-0">
//             <div className="space-y-2">
//               {conversations.map((convo) => (
//                 <div
//                   key={convo.id}
//                   className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
//                   onClick={() => router.push(`/chat/${convo.id}`)}
//                 >
//                   <div className="flex items-center gap-3">
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
//                             <svg className="h-2 w-2 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             Concluído
//                           </span>
//                         )}
//                         {convo.status === "pending" && (
//                           <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 flex items-center">
//                             <svg className="h-2 w-2 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                               />
//                             </svg>
//                             Pendente
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
//                 </div>
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="pending" className="mt-0">
//             <div className="space-y-2">
//               {conversations
//                 .filter((convo) => convo.status === "pending")
//                 .map((convo) => (
//                   <div
//                     key={convo.id}
//                     className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
//                     onClick={() => router.push(`/chat/${convo.id}`)}
//                   >
//                     <div className="flex items-center gap-3">
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
//                             <svg className="h-2 w-2 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                               />
//                             </svg>
//                             Pendente
//                           </span>
//                         </div>
//                       </div>

//                       {convo.unread > 0 && (
//                         <div className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                           {convo.unread}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="completed" className="mt-0">
//             <div className="space-y-2">
//               {conversations
//                 .filter((convo) => convo.status === "completed")
//                 .map((convo) => (
//                   <div
//                     key={convo.id}
//                     className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
//                     onClick={() => router.push(`/chat/${convo.id}`)}
//                   >
//                     <div className="flex items-center gap-3">
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
//                             <svg className="h-2 w-2 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             Concluído
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>

//       {/* Floating Action Button */}
//       <div className="fixed bottom-6 right-6">
//         <Button className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg">
//           <Plus className="h-6 w-6" />
//         </Button>
//       </div>
//     </div>
//   )
// }

"use client"
import { ArrowLeft, Search, Filter, Plus, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { connectSocket, getSocket } from "@/services/socket"

export default function ChatPage() {
  const router = useRouter()
  const [conversations, setConversations] = useState([
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
      transactionId: "t123",
      buyerId: "b456"
    },
    {
      id: 2,
      name: "Marta",
      lastMessage: "Obrigado pela negociação!",
      time: "Ontem",
      unread: 0,
      country: "Brasil",
      online: false,
      amount: "5000 EUROS",
      rate: "595KZ",
      status: "completed",
      transactionId: "t124",
      buyerId: "b457"
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
      transactionId: "t125",
      buyerId: "b458"
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
      transactionId: "t126",
      buyerId: "b459"
    },
  ])
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Connect to socket when component mounts
  useEffect(() => {
    // Get the token from localStorage or your auth system
    const token = localStorage.getItem("token") || "dummy-token"
    
    try {
      const socket = connectSocket(token)
      
      // Set up event listeners
      socket.on("connect", () => {
        console.log("Socket connected")
        setIsConnected(true)
      })
      
      socket.on("disconnect", () => {
        console.log("Socket disconnected")
        setIsConnected(false)
      })
      
      socket.on("error", (data) => {
        console.error("Socket error:", data)
        setError(data.message)
      })
      
      socket.on("newMessage", (message) => {
        console.log("New message received:", message)
        // Update conversation with new message
        handleNewMessage(message)
      })
      
      // Cleanup on unmount
      return () => {
        socket.off("connect")
        socket.off("disconnect")
        socket.off("error")
        socket.off("newMessage")
        socket.disconnect()
      }
    } catch (err) {
      console.error("Failed to connect socket:", err)
      setError("Failed to connect to chat server")
    }
  }, [])

  // Handle incoming messages
  const handleNewMessage = (message) => {
    setConversations((prevConversations) => {
      return prevConversations.map(convo => {
        // This is a simplified approach - in a real app, you'd need to match the sender with the conversation
        if (convo.transactionId === message.transactionId) {
          return {
            ...convo,
            lastMessage: message.content,
            time: "Agora",
            unread: convo.unread + 1
          }
        }
        return convo
      })
    })
  }

  // Join a chat room when clicking on a conversation
  const handleJoinChat = (convo) => {
    try {
      const socket = getSocket()
      socket.emit("joinChat", {
        transactionId: convo.transactionId,
        buyerId: convo.buyerId
      })
      
      // Navigate to the chat detail page
      router.push(`/chat/${convo.id}`)
    } catch (err) {
      console.error("Failed to join chat:", err)
      setError("Failed to join chat")
    }
  }

  // Filter conversations based on search query
  const filteredConversations = searchQuery 
    ? conversations.filter(convo => 
        convo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        convo.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white py-2 px-4 border-b flex items-center gap-3 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold">Conversas</h1>
        {isConnected && <span className="text-xs text-green-500">●&nbsp;Online</span>}
        {!isConnected && <span className="text-xs text-red-500">●&nbsp;Offline</span>}
      </header>

      {/* Error Message */}
      {error && (
        <div className="fixed top-14 left-0 right-0 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 z-40">
          <p>{error}</p>
          <button 
            className="absolute top-1 right-2 text-red-500" 
            onClick={() => setError(null)}
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-14 pb-16 px-4">
        {/* Search and Filter */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              className="pl-9 py-2 bg-white" 
              placeholder="Pesquisar conversas" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-10 bg-white rounded-md mb-4">
            <TabsTrigger value="all" className="text-sm rounded-none">
              Todas
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-sm rounded-none">
              Pendentes
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-sm rounded-none">
              Concluídas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="space-y-2">
              {filteredConversations.map((convo) => (
                <div
                  key={convo.id}
                  className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
                  onClick={() => handleJoinChat(convo)}
                >
                  <div className="flex items-center gap-3">
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
                            <svg className="h-2 w-2 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Concluído
                          </span>
                        )}
                        {convo.status === "pending" && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 flex items-center">
                            <svg className="h-2 w-2 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Pendente
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
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-0">
            <div className="space-y-2">
              {filteredConversations
                .filter((convo) => convo.status === "pending")
                .map((convo) => (
                  <div
                    key={convo.id}
                    className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
                    onClick={() => handleJoinChat(convo)}
                  >
                    <div className="flex items-center gap-3">
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
                            <svg className="h-2 w-2 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Pendente
                          </span>
                        </div>
                      </div>

                      {convo.unread > 0 && (
                        <div className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {convo.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            <div className="space-y-2">
              {filteredConversations
                .filter((convo) => convo.status === "completed")
                .map((convo) => (
                  <div
                    key={convo.id}
                    className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
                    onClick={() => handleJoinChat(convo)}
                  >
                    <div className="flex items-center gap-3">
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
                            <svg className="h-2 w-2 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Concluído
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}