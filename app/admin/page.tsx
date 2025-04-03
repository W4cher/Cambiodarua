"use client"

import { useState } from "react"
import { Users, FileText, BarChart2, AlertTriangle, ArrowUpRight, ArrowDownRight, Calendar, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Componente para o gráfico de área
const AreaChart = () => (
  <div className="h-[200px] w-full">
    <div className="h-full w-full rounded-md bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="flex h-full w-full items-end gap-2">
        {Array.from({ length: 12 }).map((_, i) => {
          const height = Math.floor(Math.random() * 70) + 30
          return <div key={i} className="bg-blue-500 rounded-t-sm w-full" style={{ height: `${height}%` }}></div>
        })}
      </div>
    </div>
  </div>
)

// Componente para o gráfico de barras
const BarChart = () => (
  <div className="h-[200px] w-full">
    <div className="h-full w-full rounded-md bg-gradient-to-b from-green-50 to-white p-4">
      <div className="flex h-full w-full items-end gap-2">
        {Array.from({ length: 7 }).map((_, i) => {
          const height = Math.floor(Math.random() * 70) + 30
          return <div key={i} className="bg-green-500 rounded-t-sm w-full" style={{ height: `${height}%` }}></div>
        })}
      </div>
    </div>
  </div>
)

// Componente para o gráfico de pizza
const PieChart = () => (
  <div className="h-[200px] w-full flex items-center justify-center">
    <div className="relative h-40 w-40">
      <div className="absolute inset-0 rounded-full bg-blue-200"></div>
      <div
        className="absolute inset-0 rounded-full bg-green-400"
        style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%, 50% 100%)" }}
      ></div>
      <div
        className="absolute inset-0 rounded-full bg-yellow-400"
        style={{ clipPath: "polygon(50% 50%, 0 0, 50% 0)" }}
      ></div>
      <div
        className="absolute inset-0 rounded-full bg-red-400"
        style={{ clipPath: "polygon(50% 50%, 0 0, 0 100%, 50% 100%)" }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-20 w-20 rounded-full bg-white"></div>
      </div>
    </div>
  </div>
)

export default function AdminDashboard() {
  const [period, setPeriod] = useState("7d")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do sistema e estatísticas principais</p>
        </div>
        <div className="mt-4 flex items-center gap-2 md:mt-0">
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
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +12.5%
              </span>{" "}
              em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Checks Criados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,427</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +8.2%
              </span>{" "}
              em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transações</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                -3.1%
              </span>{" "}
              em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tentativas de Fraude</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                -14.3%
              </span>{" "}
              em relação ao período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Atividade de Transações</CardTitle>
            <CardDescription>Volume de transações nos últimos meses</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Distribuição de Checks</CardTitle>
            <CardDescription>Por status</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart />
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-blue-400"></div>
                <span className="text-xs">Ativos (45%)</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-green-400"></div>
                <span className="text-xs">Concluídos (30%)</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-yellow-400"></div>
                <span className="text-xs">Pendentes (15%)</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-red-400"></div>
                <span className="text-xs">Cancelados (10%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Atividades recentes */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>Últimas atividades no sistema</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  user: "João Silva",
                  action: "criou um novo check",
                  time: "há 5 minutos",
                  amount: "€1,000",
                  status: "active",
                },
                {
                  user: "Maria Oliveira",
                  action: "completou uma transação",
                  time: "há 15 minutos",
                  amount: "€500",
                  status: "completed",
                },
                {
                  user: "Carlos Santos",
                  action: "foi bloqueado pelo sistema",
                  time: "há 1 hora",
                  reason: "Tentativa de fraude",
                  status: "blocked",
                },
                {
                  user: "Ana Pereira",
                  action: "registrou-se na plataforma",
                  time: "há 2 horas",
                  status: "new",
                },
                {
                  user: "Pedro Costa",
                  action: "cancelou uma transação",
                  time: "há 3 horas",
                  amount: "€750",
                  status: "cancelled",
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${activity.user[0]}`} />
                    <AvatarFallback>{activity.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                      {activity.amount && <span className="font-semibold"> {activity.amount}</span>}
                      {activity.reason && <span className="text-red-500"> ({activity.reason})</span>}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "ml-auto",
                      activity.status === "active" && "border-blue-500 text-blue-500",
                      activity.status === "completed" && "border-green-500 text-green-500",
                      activity.status === "blocked" && "border-red-500 text-red-500",
                      activity.status === "new" && "border-purple-500 text-purple-500",
                      activity.status === "cancelled" && "border-orange-500 text-orange-500",
                    )}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Usuários por Status</CardTitle>
            <CardDescription>Distribuição de usuários por status</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart />
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Ativos (78%)</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs">Pendentes (12%)</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                <span className="text-xs">Bloqueados (5%)</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-gray-500"></div>
                <span className="text-xs">Inativos (5%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas detalhadas */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas Detalhadas</CardTitle>
          <CardDescription>Métricas detalhadas do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transactions">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="transactions">Transações</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="checks">Checks</TabsTrigger>
              <TabsTrigger value="fraud">Fraudes</TabsTrigger>
            </TabsList>
            <TabsContent value="transactions" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total de Transações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,845</div>
                    <div className="text-xs text-muted-foreground">No período selecionado</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Transações Bem-sucedidas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,156</div>
                    <div className="text-xs text-muted-foreground">75.8% do total</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Transações Canceladas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">412</div>
                    <div className="text-xs text-muted-foreground">14.5% do total</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Valor Médio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">€845</div>
                    <div className="text-xs text-muted-foreground">Por transação</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="users" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total de Usuários</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,248</div>
                    <div className="text-xs text-muted-foreground">Registrados</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Usuários Ativos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">974</div>
                    <div className="text-xs text-muted-foreground">78.0% do total</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Novos Usuários</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">87</div>
                    <div className="text-xs text-muted-foreground">No período selecionado</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Usuários Bloqueados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">62</div>
                    <div className="text-xs text-muted-foreground">5.0% do total</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="checks" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total de Checks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3,427</div>
                    <div className="text-xs text-muted-foreground">Criados</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Checks Ativos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,542</div>
                    <div className="text-xs text-muted-foreground">45.0% do total</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Checks Concluídos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,028</div>
                    <div className="text-xs text-muted-foreground">30.0% do total</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Checks Cancelados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">342</div>
                    <div className="text-xs text-muted-foreground">10.0% do total</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="fraud" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Tentativas de Fraude</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-xs text-muted-foreground">No período selecionado</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Taxa de Fraude</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0.84%</div>
                    <div className="text-xs text-muted-foreground">Das transações</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Contas Bloqueadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18</div>
                    <div className="text-xs text-muted-foreground">Por atividade suspeita</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Valor Evitado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">€12,450</div>
                    <div className="text-xs text-muted-foreground">Em fraudes bloqueadas</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Função auxiliar para concatenar nomes de classe condicionalmente
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

