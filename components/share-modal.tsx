"use client"

import { useState } from "react"
import { X, Copy, Check, Facebook, Twitter, PhoneIcon as WhatsApp, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  url: string
}

export default function ShareModal({ isOpen, onClose, title, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-medium">Compartilhar</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Compartilhar em redes sociais</h3>
            <div className="grid grid-cols-5 gap-2">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <Facebook className="h-5 w-5 text-blue-600" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <Twitter className="h-5 w-5 text-blue-400" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <WhatsApp className="h-5 w-5 text-green-500" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <Linkedin className="h-5 w-5 text-blue-700" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <Mail className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Copiar link</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-100 rounded-md p-2 text-xs text-gray-600 truncate">{url}</div>
              <Button
                variant="outline"
                size="sm"
                className={`h-9 ${copied ? "bg-green-50 text-green-600" : ""}`}
                onClick={handleCopyLink}
              >
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? "Copiado" : "Copiar"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
