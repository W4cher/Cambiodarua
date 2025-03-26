"use client"

import { useState, useEffect } from "react"
import LoadingSpinner from "./loading-spinner"

interface ChatRedirectProps {
  recipientName?: string
}

export default function ChatRedirect({ recipientName }: ChatRedirectProps) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center max-w-xs w-full">
        <LoadingSpinner size={40} className="text-blue-600 mb-4" />
        <h3 className="text-lg font-medium mb-2">Carregando chat</h3>
        <p className="text-sm text-gray-500 text-center mb-2">
          {recipientName ? `Iniciando conversa com ${recipientName}...` : "Abrindo suas conversas..."}
        </p>
        <p className="text-xs text-gray-400">
          Aguarde {countdown} segundo{countdown !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  )
}

