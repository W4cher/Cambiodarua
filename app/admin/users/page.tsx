"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  MoreHorizontal,
  UserCheck,
  UserX,
  Eye,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados de exemplo para usuários
const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@example.com",
    status: "active",
    role: "user",
    verified: true,
    location: "Lisboa, Portugal",
    joinedAt: "2023-01-15",
    lastActive: "2023-04-01T10:23:14",
    transactions: 24,
    checks: 12,
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    status: "active",
    role: "user",
    verified: true,
    location: "Porto, Portugal",
    joinedAt: "2023-02-20",
    lastActive: "2023-04-01T09:45:22",
    transactions: 18,
    checks: 8,
  },
  {
    id: 3,
    name: "Carlos Santos",
    email: "carlos.santos@example.com",
    status: "blocked",
    role: "user",
    verified: true,
    location: "Luanda, Angola",
    joinedAt: "2023-01-05",
    lastActive: "2023-03-15T14:12:05",
    transactions: 5,
    checks: 3,
  },
  {
    id: 4,
    name: "Ana Pereira",
    email: "ana.pereira@example.com",
    status: "pending",
    role: "user",
    verified: false,
    location: "Faro, Portugal",
    joinedAt: "2023-03-28",
    lastActive: "2023-03-28T16:30:45",
    transactions: 0,
    checks: 0,
  },
  {
    id: 5,
    name: "Pedro Costa",
    email: "pedro.costa@example.com",
    status: "active",
    role: "admin",
    verified: true,
    location: "Lisboa, Portugal",
    joinedAt: "2022-11-10",
    lastActive: "2023-04-01T11:05:33",
    transactions: 32,
    checks: 15,
  },
  {
    id: 6,
    name: "Sofia Martins",
    email: "sofia.martins@example.com",
    status: "inactive",
    role: "user",
    verified: true,
    location: "Braga, Portugal",
    joinedAt: "2022-12-05",
    lastActive: "2023-02-15T08:22:17",
    transactions: 7,
    checks: 4,
  },
  {
    id: 7,
    name: "Miguel Ferreira",
    email: "miguel.ferreira@example.com",
    status: "active",
    role: "user",
    verified: true,
    location: "Coimbra, Portugal",
    joinedAt: "2023-01-22",
    lastActive: "2023-03-30T17:45:12",
    transactions: 15,
    checks: 9,
  },
  {
    id: 8,
    name: "Beatriz Almeida",
    email: "beatriz.almeida@example.com",
    status: "pending",
    role: "user",
    verified: false,
    location: "Aveiro, Portugal",
    joinedAt: "2023-03-30",
    lastActive: "2023-03-30T10:15:08",
    transactions: 0,
    checks: 0,
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false)
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false)
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false)

  // Filtrar usuários com base nos filtros aplicados
  const filteredUsers = users.filter((user) => {
    // Filtro de pesquisa
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de status
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewUser = (user: any) => {
    setSelectedUser(user)
    setIsUserDetailsOpen(true)
  }

  const handleVerifyUser = (user: any) => {
    setSelectedUser(user)
    setIsVerifyDialogOpen(true)
  }

  const handleBlockUser = (user: any) => {
    setSelectedUser(user)
    setIsBlockDialogOpen(true)
  }

  const confirmVerifyUser = () => {
    // Lógica para verificar usuário
    console.log(`Verificando usuário: ${selectedUser?.name}`)
    setIsVerifyDialogOpen(false)
  }

  const confirmBlockUser = () => {
    // Lógica para bloquear/desbloquear usuário
    console.log(`${selectedUser?.status === "blocked" ? "Desbloqueando" : "Bloqueando"} usuário: ${selectedUser?.name}`)
    setIsBlockDialogOpen(false)
  }

  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"

    if (dateString.includes("T")) {
      // Se for um timestamp completo (com hora)
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    } else {
      // Se for apenas uma data
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date)
    }
  }

  // Calcular tempo desde a última atividade
  const getTimeAgo = (dateString: string) => {
    if (!dateString) return "N/A"

    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60))
        return `${diffMinutes} minutos atrás`
      }
      return `${diffHours} horas atrás`
    } else if (diffDays === 1) {
      return "ontem"
    } else {
      return `${diffDays} dias atrás`
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Usuários</h1>
          <p className="text-muted-foreground">Gerencie os usuários da plataforma</p>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-2 md:mt-0">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>Total de {users.length} usuários registrados na plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar usuários..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="blocked">Bloqueados</SelectItem>
                  <SelectItem value="inactive">Inativos</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Verificado</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Registrado em</TableHead>
                  <TableHead>Última atividade</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${user.name[0]}`} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.status === "active"
                              ? "border-green-500 text-green-500"
                              : user.status === "pending"
                                ? "border-yellow-500 text-yellow-500"
                                : user.status === "blocked"
                                  ? "border-red-500 text-red-500"
                                  : "border-gray-500 text-gray-500"
                          }
                        >
                          {user.status === "active"
                            ? "Ativo"
                            : user.status === "pending"
                              ? "Pendente"
                              : user.status === "blocked"
                                ? "Bloqueado"
                                : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                          {user.role === "admin" ? "Admin" : "Usuário"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.verified ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell>{user.location}</TableCell>
                      <TableCell>{formatDate(user.joinedAt)}</TableCell>
                      <TableCell>{getTimeAgo(user.lastActive)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewUser(user)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalhes
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {!user.verified && (
                              <DropdownMenuItem onClick={() => handleVerifyUser(user)}>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Verificar usuário
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleBlockUser(user)}
                              className={user.status === "blocked" ? "text-green-600" : "text-red-600"}
                            >
                              <UserX className="mr-2 h-4 w-4" />
                              {user.status === "blocked" ? "Desbloquear usuário" : "Bloquear usuário"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      Nenhum usuário encontrado com os filtros aplicados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo de detalhes do usuário */}
      <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Usuário</DialogTitle>
            <DialogDescription>Informações detalhadas sobre {selectedUser?.name}</DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="mt-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={`/placeholder.svg?height=96&width=96&text=${selectedUser.name[0]}`} />
                      <AvatarFallback className="text-2xl">{selectedUser.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 text-lg font-semibold">{selectedUser.name}</h3>
                    <p className="text-sm text-gray-500">{selectedUser.email}</p>
                    <div className="mt-2">
                      <Badge
                        variant="outline"
                        className={
                          selectedUser.status === "active"
                            ? "border-green-500 text-green-500"
                            : selectedUser.status === "pending"
                              ? "border-yellow-500 text-yellow-500"
                              : selectedUser.status === "blocked"
                                ? "border-red-500 text-red-500"
                                : "border-gray-500 text-gray-500"
                        }
                      >
                        {selectedUser.status === "active"
                          ? "Ativo"
                          : selectedUser.status === "pending"
                            ? "Pendente"
                            : selectedUser.status === "blocked"
                              ? "Bloqueado"
                              : "Inativo"}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Função</p>
                      <p className="text-sm">{selectedUser.role === "admin" ? "Administrador" : "Usuário"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Verificado</p>
                      <p className="text-sm flex items-center">
                        {selectedUser.verified ? (
                          <>
                            <CheckCircle className="mr-1 h-4 w-4 text-green-500" /> Sim
                          </>
                        ) : (
                          <>
                            <XCircle className="mr-1 h-4 w-4 text-red-500" /> Não
                          </>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Localização</p>
                      <p className="text-sm">{selectedUser.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Registrado em</p>
                      <p className="text-sm">{formatDate(selectedUser.joinedAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Última atividade</p>
                      <p className="text-sm">{formatDate(selectedUser.lastActive)}</p>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <Tabs defaultValue="activity">
                    <TabsList className="w-full">
                      <TabsTrigger value="activity">Atividade</TabsTrigger>
                      <TabsTrigger value="transactions">Transações</TabsTrigger>
                      <TabsTrigger value="checks">Checks</TabsTrigger>
                      <TabsTrigger value="documents">Documentos</TabsTrigger>
                    </TabsList>
                    <TabsContent value="activity" className="mt-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Resumo de Atividade</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">Total de transações</p>
                              <p className="text-2xl font-bold">{selectedUser.transactions}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">Total de checks</p>
                              <p className="text-2xl font-bold">{selectedUser.checks}</p>
                            </div>
                          </div>

                          <div className="mt-6">
                            <h4 className="text-sm font-medium mb-2">Atividades recentes</h4>
                            <div className="space-y-3">
                              {[
                                {
                                  action: "Criou um novo check",
                                  date: "2023-04-01T09:23:14",
                                  details: "Check de €1,000 com taxa de 1190KZ",
                                },
                                {
                                  action: "Completou uma transação",
                                  date: "2023-03-28T14:45:22",
                                  details: "Transação de €500 com João Silva",
                                },
                                {
                                  action: "Atualizou informações de perfil",
                                  date: "2023-03-25T11:12:05",
                                  details: "Alterou localização e foto de perfil",
                                },
                              ].map((activity, i) => (
                                <div key={i} className="flex items-start gap-2 border-b pb-2">
                                  <div className="h-2 w-2 mt-1.5 rounded-full bg-blue-500"></div>
                                  <div>
                                    <p className="text-sm font-medium">{activity.action}</p>
                                    <p className="text-xs text-gray-500">{activity.details}</p>
                                    <p className="text-xs text-gray-400">{formatDate(activity.date)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="transactions" className="mt-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Transações</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>ID</TableHead>
                                  <TableHead>Data</TableHead>
                                  <TableHead>Valor</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {selectedUser.transactions > 0 ? (
                                  Array.from({ length: Math.min(5, selectedUser.transactions) }).map((_, i) => (
                                    <TableRow key={i}>
                                      <TableCell>#{1000 + i}</TableCell>
                                      <TableCell>
                                        {formatDate(
                                          `2023-${(4 - i).toString().padStart(2, "0")}-${(10 - i * 2).toString().padStart(2, "0")}`,
                                        )}
                                      </TableCell>
                                      <TableCell>€{(Math.random() * 1000).toFixed(2)}</TableCell>
                                      <TableCell>
                                        <Badge
                                          variant="outline"
                                          className={
                                            i % 3 === 0
                                              ? "border-green-500 text-green-500"
                                              : i % 3 === 1
                                                ? "border-yellow-500 text-yellow-500"
                                                : "border-red-500 text-red-500"
                                          }
                                        >
                                          {i % 3 === 0 ? "Concluída" : i % 3 === 1 ? "Pendente" : "Cancelada"}
                                        </Badge>
                                      </TableCell>
                                    </TableRow>
                                  ))
                                ) : (
                                  <TableRow>
                                    <TableCell colSpan={4} className="text-center py-4">
                                      Nenhuma transação encontrada.
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="checks" className="mt-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Checks</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>ID</TableHead>
                                  <TableHead>Data</TableHead>
                                  <TableHead>Valor</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {selectedUser.checks > 0 ? (
                                  Array.from({ length: Math.min(5, selectedUser.checks) }).map((_, i) => (
                                    <TableRow key={i}>
                                      <TableCell>#{2000 + i}</TableCell>
                                      <TableCell>
                                        {formatDate(
                                          `2023-${(4 - i).toString().padStart(2, "0")}-${(15 - i * 3).toString().padStart(2, "0")}`,
                                        )}
                                      </TableCell>
                                      <TableCell>€{(Math.random() * 1000).toFixed(2)}</TableCell>
                                      <TableCell>
                                        <Badge
                                          variant="outline"
                                          className={
                                            i % 4 === 0
                                              ? "border-green-500 text-green-500"
                                              : i % 4 === 1
                                                ? "border-blue-500 text-blue-500"
                                                : i % 4 === 2
                                                  ? "border-yellow-500 text-yellow-500"
                                                  : "border-red-500 text-red-500"
                                          }
                                        >
                                          {i % 4 === 0
                                            ? "Concluído"
                                            : i % 4 === 1
                                              ? "Ativo"
                                              : i % 4 === 2
                                                ? "Pendente"
                                                : "Cancelado"}
                                        </Badge>
                                      </TableCell>
                                    </TableRow>
                                  ))
                                ) : (
                                  <TableRow>
                                    <TableCell colSpan={4} className="text-center py-4">
                                      Nenhum check encontrado.
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="documents" className="mt-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Documentos</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {selectedUser.verified ? (
                            <div className="space-y-4">
                              <div className="rounded-md border p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                                      <FileText className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Documento de identidade</p>
                                      <p className="text-xs text-gray-500">Verificado em {formatDate("2023-01-20")}</p>
                                    </div>
                                  </div>
                                  <Badge variant="outline" className="border-green-500 text-green-500">
                                    Verificado
                                  </Badge>
                                </div>
                              </div>
                              <div className="rounded-md border p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                                      <FileText className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Comprovante de residência</p>
                                      <p className="text-xs text-gray-500">Verificado em {formatDate("2023-01-20")}</p>
                                    </div>
                                  </div>
                                  <Badge variant="outline" className="border-green-500 text-green-500">
                                    Verificado
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="rounded-md border p-4">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-yellow-500" />
                                <p className="text-sm">
                                  Usuário ainda não enviou documentos ou está aguardando verificação.
                                </p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            <div>
              {selectedUser && selectedUser.status !== "blocked" && (
                <Button variant="destructive" onClick={() => handleBlockUser(selectedUser)}>
                  <UserX className="mr-2 h-4 w-4" />
                  Bloquear usuário
                </Button>
              )}
              {selectedUser && selectedUser.status === "blocked" && (
                <Button variant="outline" className="text-green-600" onClick={() => handleBlockUser(selectedUser)}>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Desbloquear usuário
                </Button>
              )}
            </div>
            <Button variant="outline" onClick={() => setIsUserDetailsOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de verificação de usuário */}
      <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verificar Usuário</DialogTitle>
            <DialogDescription>
              Você está prestes a verificar o usuário {selectedUser?.name}. Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              Ao verificar este usuário, você confirma que todos os documentos foram revisados e aprovados de acordo com
              as políticas da plataforma.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVerifyDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmVerifyUser}>
              <UserCheck className="mr-2 h-4 w-4" />
              Verificar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de bloqueio/desbloqueio de usuário */}
      <Dialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedUser?.status === "blocked" ? "Desbloquear Usuário" : "Bloquear Usuário"}</DialogTitle>
            <DialogDescription>
              {selectedUser?.status === "blocked"
                ? `Você está prestes a desbloquear o usuário ${selectedUser?.name}. Isso permitirá que ele acesse a plataforma novamente.`
                : `Você está prestes a bloquear o usuário ${selectedUser?.name}. Isso impedirá que ele acesse a plataforma.`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              {selectedUser?.status === "blocked"
                ? "Ao desbloquear este usuário, ele poderá fazer login e usar a plataforma normalmente."
                : "Ao bloquear este usuário, ele não poderá fazer login ou realizar qualquer ação na plataforma até que seja desbloqueado."}
            </p>
            {selectedUser?.status !== "blocked" && (
              <div className="mt-4">
                <label htmlFor="block-reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Motivo do bloqueio (opcional)
                </label>
                <Input id="block-reason" placeholder="Informe o motivo do bloqueio" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBlockDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant={selectedUser?.status === "blocked" ? "default" : "destructive"} onClick={confirmBlockUser}>
              {selectedUser?.status === "blocked" ? (
                <>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Desbloquear
                </>
              ) : (
                <>
                  <UserX className="mr-2 h-4 w-4" />
                  Bloquear
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

