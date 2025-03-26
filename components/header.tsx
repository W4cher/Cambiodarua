"use client"

import { Home, MessageCircle, RefreshCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import NotificationDropdown from "./notification-dropdown"
import AvatarMenu from "./avatar-menu"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Header() {
  const router = useRouter()

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    console.log("Usuário fez logout")
    // Redirecionar para página de login
  }

  // Removendo a navegação para a página de chat
  // O chat será exibido na mesma página através do estado no componente principal

  const handleHomeClick = () => {
    router.push("/")
  }

  return (
    <header className="bg-white py-1 px-4 border-b flex items-center justify-between fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="flex items-center gap-3">
        <Link href="/">
          <h1 className="text-lg font-bold cursor-pointer">CAMBIO DA RUA</h1>
        </Link>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full" onClick={handleHomeClick}>
          <Home className="text-green-600 h-4 w-4" />
        </Button>
      </div>
      <div className="relative flex-1 max-w-xl mx-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
        <Input className="pl-7 py-1 h-8 text-sm bg-gray-100 border-none" placeholder="Buscar vendedores, bancos..." />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-gray-100 rounded-full p-1.5">
          <NotificationDropdown triggerIcon={<RefreshCw className="h-4 w-4 text-gray-500" />} hasUnread={true} />
        </div>

        {/* O botão de chat agora não tem ação - será controlado pelo componente principal */}
        <div className="flex items-center bg-gray-100 rounded-full p-1.5">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 rounded-full relative"
            id="chat-button" // ID para ser referenciado pelo componente principal
          >
            <MessageCircle className="h-4 w-4 text-gray-500" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-green-500 rounded-full"></span>
          </Button>
        </div>

        <AvatarMenu
          avatarUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6y1DD2HpE44nRO31RSOdKy9JdsolMN.png"
          username="João Doe"
          onLogout={handleLogout}
        />
      </div>
    </header>
  )
}

