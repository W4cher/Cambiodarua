"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  MoreHorizontal,
  Download,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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

// Dados de exemplo para transações
const transactions = [
  {
    id: 1001,
    amount: "1,000 EUR",
    rate: "1190 KZ",
    totalValue: "1,190,000 KZ",
    status: "completed",
    date: "2023-04-01T10:23:14",
    sender: {
      id: 1,
      name: "João Silva",
      email: "joao.silva@example.com",
    },
    receiver: {
      id: 2,
      name: "Maria Oliveira",
      email: "maria.oliveira@example.com",
    },
    paymentMethod: "Transferência bancária",
    banks: ["BAI", "Santander"],
    checkId: 2001,
  },
  {
    id: 1002,
    amount: "500 EUR",
    rate: "1195 KZ",
    totalValue: "597,500 KZ",
    status: "pending",
    date: "2023-04-01T09:45:22",
    sender: {
      id: 3,
      name: "Carlos Santos",
      email: "carlos.santos@example.com",
    },
    receiver: {
      id: 4,
      name: "Ana Pereira",
      email: "ana.pereira@example.com",
    },
    paymentMethod: "Transferência bancária",
    banks: ["BFA", "Millennium"],
    checkId: 2002,
  },
  {
    id: 1003,
    amount: "2,000 EUR",
    rate: "1185 KZ",
    totalValue: "2,370,000 KZ",
    status: "cancelled",
    date: "2023-03-31T14:12:05",
    sender: {
      id: 5,
      name: "Pedro Costa",
      email: "pedro.costa@example.com",
    },
    receiver: {
      id: 6,
      name: "Sofia Martins",
      email: "sofia.martins@example.com",
    },
    paymentMethod: "Transferência bancária",
    banks: ["BAI", "BPC"],
    checkId: 2003,
    cancellationReason: "Desistência do comprador",
  },
  {
    id: 1004,
    amount: "300 EUR",
    rate: "1200 KZ",
    totalValue: "360,000 KZ",
    status: "completed",
    date: "2023-03-30T16:30:45",
    sender: {
      id: 7,
      name: "Miguel Ferreira",
      email: "miguel.ferreira@example.com",
    },
    receiver: {
      id: 8,
      name: "Beatriz Almeida",
      email: "beatriz.almeida@example.com",
    },
    paymentMethod: "Transferência bancária",
    banks: ["BPC", "Barclays"],
    checkId: 2004,
  },
  {
    id: 1005,
    amount: "1,500 EUR",
    rate: "1192 KZ",
    totalValue: "1,788,000 KZ",
    status: "flagged",
    date: "2023-03-29T11:05:33",
    sender: {
      id: 9,
      name: "Ricardo Nunes",
      email: "ricardo.nunes@example.com",
    },
    receiver: {
      id: 10,
      name: "Catarina Lopes",
      email: "catarina.lopes@example.com",
    },
    paymentMethod: "Transferência bancária",
    banks: ["BAI", "Santander"],
    checkId: 2005,
    flagReason: "Valor acima do limite permitido",
  },
  {
    id: 1006,
    amount: "750 EUR",
    rate: "1188 KZ",
    totalValue: "891,000 KZ",
    status: "completed",
    date: "2023-03-28T08:22:17",
    sender: {
      id: 11,
      name: "André Sousa",
      email: "andre.sousa@example.com",
    },
    receiver: {
      id: 12,
      name: "Mariana Costa",
      email: "mariana.costa@example.com",
    },
    paymentMethod: "Transferência bancária",
    banks: ["BFA", "Millennium"],
    checkId: 2006,
  },
  {
    id: 1007,
    amount: "2,500 EUR",
    rate: "1187 KZ",
    totalValue: "2,967,500 KZ",
    status: "pending",
    date: "2023-03-27T17:45:12",
    sender: {
      id: 13,
      name: "Paulo Mendes",
      email: "paulo.mendes@example.com",
    },
    receiver: {
      id: 14,
      name: "Inês Santos",
      email: "ines.santos@example.com",
    },
    paymentMethod: "Transferência bancária",
    banks: ["BAI", "Santander"],
    checkId: 2007,
  },
  {
    id: 1008,
    amount: "400 EUR",
    rate: "1195 KZ",
    totalValue: "478,000 KZ",
    status: "completed",
    date: "2023-03-26T10:15:08",
    sender: {
      id: 15,
      name: "Tiago Oliveira",
      email: "tiago.oliveira@example.com",
    },
    receiver: {
      id: 16,
      name: "Carolina Silva",
      email: "carolina.silva@example.com",
    },
    paymentMethod: "Transferência bancária",
    banks: ["BPC", "Barclays"],
    checkId: 2008,
  },
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null)
  const [isTransactionDetailsOpen, setIsTransactionDetailsOpen] = useState(false)
  const [period, setPeriod] = useState("7d")

  // Filtrar transações com base nos filtros aplicados
  const filteredTransactions = transactions.filter((transaction) => {
    // Filtro de pesquisa
    const matchesSearch =
      transaction.id.toString().includes(searchTerm) ||
      transaction.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.receiver.name.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de status
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsTransactionDetailsOpen(true)
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transações</h1>
          <p className="text-muted-foreground">Gerencie e monitore todas as transações da plataforma</p>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-2 md:mt-0">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Últimas 24 horas</SelectItem>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
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

      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Transações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <p className="text-xs text-muted-foreground">No período selecionado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transações Concluídas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,156</div>
            <p className="text-xs text-muted-foreground">75.8% do total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transações Pendentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">277</div>
            <p className="text-xs text-muted-foreground">9.7% do total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transações Canceladas</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">412</div>
            <p className="text-xs text-muted-foreground">14.5% do total</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Lista de Transações</CardTitle>
          <CardDescription>Total de {transactions.length} transações registradas na plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar transações..."
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
                  <SelectItem value="completed">Concluídas</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="cancelled">Canceladas</SelectItem>
                  <SelectItem value="flagged">Sinalizadas</SelectItem>
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
                  <TableHead>ID</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Taxa</TableHead>
                  <TableHead>Remetente</TableHead>
                  <TableHead>Destinatário</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">#{transaction.id}</TableCell>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.rate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={`/placeholder.svg?height=24&width=24&text=${transaction.sender.name[0]}`}
                            />
                            <AvatarFallback>{transaction.sender.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{transaction.sender.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={`/placeholder.svg?height=24&width=24&text=${transaction.receiver.name[0]}`}
                            />
                            <AvatarFallback>{transaction.receiver.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{transaction.receiver.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            transaction.status === "completed"
                              ? "border-green-500 text-green-500"
                              : transaction.status === "pending"
                                ? "border-yellow-500 text-yellow-500"
                                : transaction.status === "cancelled"
                                  ? "border-red-500 text-red-500"
                                  : "border-orange-500 text-orange-500"
                          }
                        >
                          {transaction.status === "completed"
                            ? "Concluída"
                            : transaction.status === "pending"
                              ? "Pendente"
                              : transaction.status === "cancelled"
                                ? "Cancelada"
                                : "Sinalizada"}
                        </Badge>
                      </TableCell>
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
                            <DropdownMenuItem onClick={() => handleViewTransaction(transaction)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalhes
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      Nenhuma transação encontrada com os filtros aplicados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo de detalhes da transação */}
      <Dialog open={isTransactionDetailsOpen} onOpenChange={setIsTransactionDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Transação</DialogTitle>
            <DialogDescription>Informações detalhadas sobre a transação #{selectedTransaction?.id}</DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="mt-4 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Transação #{selectedTransaction.id}</h3>
                  <p className="text-sm text-gray-500">Check #{selectedTransaction.checkId}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    selectedTransaction.status === "completed"
                      ? "border-green-500 text-green-500"
                      : selectedTransaction.status === "pending"
                        ? "border-yellow-500 text-yellow-500"
                        : selectedTransaction.status === "cancelled"
                          ? "border-red-500 text-red-500"
                          : "border-orange-500 text-orange-500"
                  }
                >
                  {selectedTransaction.status === "completed"
                    ? "Concluída"
                    : selectedTransaction.status === "pending"
                      ? "Pendente"
                      : selectedTransaction.status === "cancelled"
                        ? "Cancelada"
                        : "Sinalizada"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Detalhes da Transação</h4>
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Data</span>
                        <span className="text-sm">{formatDate(selectedTransaction.date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Valor</span>
                        <span className="text-sm">{selectedTransaction.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Taxa</span>
                        <span className="text-sm">{selectedTransaction.rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Valor Total</span>
                        <span className="text-sm font-semibold">{selectedTransaction.totalValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Método de Pagamento</span>
                        <span className="text-sm">{selectedTransaction.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Bancos</span>
                        <span className="text-sm">{selectedTransaction.banks.join(", ")}</span>
                      </div>
                      {selectedTransaction.status === "cancelled" && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Motivo do Cancelamento</span>
                          <span className="text-sm text-red-500">{selectedTransaction.cancellationReason}</span>
                        </div>
                      )}
                      {selectedTransaction.status === "flagged" && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Motivo da Sinalização</span>
                          <span className="text-sm text-orange-500">{selectedTransaction.flagReason}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Participantes</h4>
                  <Card className="mb-4">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${selectedTransaction.sender.name[0]}`}
                          />
                          <AvatarFallback>{selectedTransaction.sender.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Remetente</p>
                          <p className="text-sm">{selectedTransaction.sender.name}</p>
                          <p className="text-xs text-gray-500">{selectedTransaction.sender.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${selectedTransaction.receiver.name[0]}`}
                          />
                          <AvatarFallback>{selectedTransaction.receiver.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Destinatário</p>
                          <p className="text-sm">{selectedTransaction.receiver.name}</p>
                          <p className="text-xs text-gray-500">{selectedTransaction.receiver.email}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <h4 className="text-sm font-medium text-gray-500 mb-2">Histórico</h4>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="h-2 w-2 mt-1.5 rounded-full bg-green-500"></div>
                          <div>
                            <p className="text-sm font-medium">Transação criada</p>
                            <p className="text-xs text-gray-500">{formatDate(selectedTransaction.date)}</p>
                          </div>
                        </div>
                        {selectedTransaction.status === "completed" && (
                          <div className="flex items-start gap-2">
                            <div className="h-2 w-2 mt-1.5 rounded-full bg-green-500"></div>
                            <div>
                              <p className="text-sm font-medium">Pagamento confirmado</p>
                              <p className="text-xs text-gray-500">{formatDate(selectedTransaction.date)}</p>
                            </div>
                          </div>
                        )}
                        {selectedTransaction.status === "cancelled" && (
                          <div className="flex items-start gap-2">
                            <div className="h-2 w-2 mt-1.5 rounded-full bg-red-500"></div>
                            <div>
                              <p className="text-sm font-medium">Transação cancelada</p>
                              <p className="text-xs text-gray-500">{formatDate(selectedTransaction.date)}</p>
                              <p className="text-xs text-red-500">{selectedTransaction.cancellationReason}</p>
                            </div>
                          </div>
                        )}
                        {selectedTransaction.status === "flagged" && (
                          <div className="flex items-start gap-2">
                            <div className="h-2 w-2 mt-1.5 rounded-full bg-orange-500"></div>
                            <div>
                              <p className="text-sm font-medium">Transação sinalizada</p>
                              <p className="text-xs text-gray-500">{formatDate(selectedTransaction.date)}</p>
                              <p className="text-xs text-orange-500">{selectedTransaction.flagReason}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTransactionDetailsOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

