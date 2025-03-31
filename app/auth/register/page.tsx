"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, User, Lock, ArrowRight, AlertCircle, MapPin, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    location: "",
    profileImage: null as File | null,
    documentType: "personalId",
    documentFile: null as File | null,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)
  const [documentFilePreview, setDocumentFilePreview] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: "profileImage" | "documentFile") => {
    const file = e.target.files?.[0] || null

    if (file) {
      setFormData((prev) => ({ ...prev, [fileType]: file }))

      // Criar preview da imagem
      const reader = new FileReader()
      reader.onload = (event) => {
        if (fileType === "profileImage") {
          setProfileImagePreview(event.target?.result as string)
        } else {
          setDocumentFilePreview(event.target?.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleOAuthRegister = (provider: string) => {
    setIsLoading(true)
    // Em um app real, isso redirecionaria para o provedor OAuth
    console.log(`Iniciando cadastro com ${provider}`)

    // Simulação
    setTimeout(() => {
      router.push("/")
    }, 1000)
  }

  const validateForm = () => {
    // Validação básica
    if (!formData.name || !formData.email || !formData.password) {
      setError("Por favor, preencha todos os campos obrigatórios")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      return false
    }

    if (formData.password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres")
      return false
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, insira um endereço de email válido")
      return false
    }

    // Validação de documento (em um app real, você verificaria o tipo de arquivo)
    if (activeTab === "verification" && !formData.documentFile) {
      setError("Por favor, faça upload do seu documento de identificação")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulação de cadastro - em um app real, isso seria uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Cadastro bem-sucedido:", formData)

      // Redirecionar para a página inicial ou de confirmação
      router.push("/auth/register-success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro ao fazer o cadastro")
    } finally {
      setIsLoading(false)
    }
  }

  const nextTab = () => {
    if (activeTab === "personal") {
      // Validar campos pessoais antes de avançar
      if (!formData.name || !formData.email || !formData.password || formData.password !== formData.confirmPassword) {
        setError("Por favor, preencha todos os campos obrigatórios corretamente")
        return
      }
      setActiveTab("profile")
    } else if (activeTab === "profile") {
      setActiveTab("verification")
    }

    setError(null)
  }

  const prevTab = () => {
    if (activeTab === "profile") {
      setActiveTab("personal")
    } else if (activeTab === "verification") {
      setActiveTab("profile")
    }

    setError(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">CAMBIO DA RUA</h1>
          <h2 className="mt-6 text-xl font-semibold text-gray-900">Criar uma nova conta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{" "}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
              entrar na sua conta existente
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Cadastre-se com</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => handleOAuthRegister("Google")}
                  disabled={isLoading}
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path
                        fill="#4285F4"
                        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                      />
                      <path
                        fill="#34A853"
                        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                      />
                    </g>
                  </svg>
                  Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => handleOAuthRegister("Facebook")}
                  disabled={isLoading}
                >
                  <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou preencha o formulário</span>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Pessoal</TabsTrigger>
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="verification">Verificação</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit}>
                <TabsContent value="personal" className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nome completo <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="pl-10"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="pl-10"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Senha <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        className="pl-10 pr-10"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">A senha deve ter pelo menos 8 caracteres</p>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirmar senha <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        className="pl-10 pr-10"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={nextTab}
                    >
                      Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="profile" className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                      Foto de perfil
                    </Label>
                    <div className="mt-1 flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {profileImagePreview ? (
                          <img
                            src={profileImagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="h-16 w-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                      >
                        <span>Fazer upload</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "profileImage")}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </Label>
                    <div className="mt-1">
                      <Textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        placeholder="Conte um pouco sobre você..."
                        value={formData.bio}
                        onChange={handleInputChange}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Breve descrição para seu perfil. Máximo 200 caracteres.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Localização
                    </Label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="location"
                        name="location"
                        type="text"
                        className="pl-10"
                        placeholder="Cidade, País"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={prevTab}
                    >
                      Voltar
                    </Button>
                    <Button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={nextTab}
                    >
                      Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="verification" className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="documentType" className="block text-sm font-medium text-gray-700">
                      Tipo de documento <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.documentType}
                      onValueChange={(value) => handleSelectChange("documentType", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo de documento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personalId">Documento de identidade</SelectItem>
                        <SelectItem value="addressProof">Comprovante de residência</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="documentFile" className="block text-sm font-medium text-gray-700">
                      Upload do documento <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
                      {documentFilePreview ? (
                        <div className="w-full">
                          <img
                            src={documentFilePreview || "/placeholder.svg"}
                            alt="Document preview"
                            className="mx-auto h-32 object-contain mb-2"
                          />
                          <p className="text-xs text-center text-gray-500">{formData.documentFile?.name}</p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2 mx-auto flex items-center"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, documentFile: null }))
                              setDocumentFilePreview(null)
                            }}
                          >
                            Remover
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-2 flex text-sm text-gray-600">
                            <label
                              htmlFor="document-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                            >
                              <span>Fazer upload de um arquivo</span>
                              <input
                                id="document-upload"
                                name="document-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*,.pdf"
                                onChange={(e) => handleFileChange(e, "documentFile")}
                              />
                            </label>
                            <p className="pl-1">ou arraste e solte</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, PDF até 10MB</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-medium text-gray-700">
                          Concordo com os{" "}
                          <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                            Termos de Serviço
                          </Link>{" "}
                          e{" "}
                          <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                            Política de Privacidade
                          </Link>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={prevTab}
                    >
                      Voltar
                    </Button>
                    <Button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      disabled={isLoading}
                    >
                      {isLoading ? "Cadastrando..." : "Concluir cadastro"}
                      {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </TabsContent>
              </form>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

