import type React from "react"
import { BellOff } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface NotificationDropdownProps {
  triggerIcon: React.ReactNode
  hasUnread?: boolean
}

export default function NotificationDropdown({ triggerIcon, hasUnread = false }: NotificationDropdownProps) {
  const notifications = [
    {
      id: 1,
      type: "follow",
      user: {
        name: "Carlos Mendes",
        avatar: "/placeholder.svg?height=40&width=40&text=CM",
      },
      message: "começou a seguir você",
      time: "2 horas atrás",
      read: false,
    },
    {
      id: 2,
      type: "share",
      user: {
        name: "Maria Silva",
        avatar: "/placeholder.svg?height=40&width=40&text=MS",
      },
      message: "compartilhou seu check de 1.000 EUROS",
      time: "5 horas atrás",
      read: false,
    },
    {
      id: 3,
      type: "follow",
      user: {
        name: "João Paulo",
        avatar: "/placeholder.svg?height=40&width=40&text=JP",
      },
      message: "começou a seguir você",
      time: "1 dia atrás",
      read: true,
    },
    {
      id: 4,
      type: "share",
      user: {
        name: "Ana Beatriz",
        avatar: "/placeholder.svg?height=40&width=40&text=AB",
      },
      message: "compartilhou seu check de 500 EUROS",
      time: "2 dias atrás",
      read: true,
    },
    {
      id: 5,
      type: "completed",
      user: {
        name: "Pedro Alves",
        avatar: "/placeholder.svg?height=40&width=40&text=PA",
      },
      message: "concluiu a negociação de 2.000 EUROS",
      time: "3 dias atrás",
      read: true,
    },
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full relative">
          {triggerIcon}
          {hasUnread && <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-green-500 rounded-full"></span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-2 border-b">
          <h2 className="font-medium text-sm">Notificações</h2>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-500 hover:bg-gray-100 rounded-full">
            <BellOff className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          <div className="divide-y">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-2 hover:bg-gray-50 ${notification.read ? "bg-white" : "bg-blue-50"}`}
                >
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                      <AvatarFallback>{notification.user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="text-xs">
                        <span className="font-medium">{notification.user.name}</span> {notification.message}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{notification.time}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">Nenhuma notificação encontrada</div>
            )}
          </div>
        </div>

        <div className="p-2 border-t text-center">
          <Button variant="link" className="text-xs text-blue-600 h-auto p-0">
            Ver todas as notificações
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

