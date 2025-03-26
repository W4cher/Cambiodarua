"use client"
import { Edit, MapPin, Calendar, Users, CheckCircle, Grid3X3, ListFilter } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import AdvertisementSpace from "@/components/advertisement-space"
import Header from "@/components/header"

export default function ProfilePage() {
  // Dados do usuário (em um app real, isso viria de uma API)
  const user = {
    id: 1,
    name: "João Doe",
    username: "@joaodoe",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6y1DD2HpE44nRO31RSOdKy9JdsolMN.png",
    bio: "Especialista em câmbio internacional. Ajudo pessoas a fazer transações seguras entre Angola, Portugal e Brasil.",
    location: "Luanda, Angola",
    joinedDate: "Março 2023",
    followers: 245,
    following: 128,
    verified: true,
  }

  // Checks publicados pelo usuário
  const userChecks = [
    {
      id: 1,
      amount: "1.000 EUROS",
      rate: "1190KZ",
      date: "2 dias atrás",
      status: "active",
      banks: ["BAI", "Santander"],
      interactions: 12,
    },
    {
      id: 2,
      amount: "500 USD",
      rate: "950KZ",
      date: "1 semana atrás",
      status: "completed",
      banks: ["BFA", "Chase"],
      interactions: 8,
    },
    {
      id: 3,
      amount: "2.000 EUROS",
      rate: "1185KZ",
      date: "2 semanas atrás",
      status: "completed",
      banks: ["BAI", "Millennium"],
      interactions: 15,
    },
    {
      id: 4,
      amount: "300 GBP",
      rate: "1450KZ",
      date: "1 mês atrás",
      status: "completed",
      banks: ["BPC", "Barclays"],
      interactions: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Reutilizando o header principal */}
      <Header />

      {/* Conteúdo principal */}
      <div className="pt-12 flex justify-center">
        <div className="flex max-w-[1200px] w-full">
          {/* Left Sidebar - Perfil do usuário */}
          <div className="w-[300px] bg-white rounded-lg shadow-sm mr-4 h-fit">
            <div className="p-4 flex flex-col items-center border-b">
              <Avatar className="h-20 w-20 border-2 border-blue-100">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="mt-3 text-center">
                <div className="flex items-center justify-center">
                  <h2 className="text-lg font-bold">{user.name}</h2>
                  {user.verified && <CheckCircle className="h-4 w-4 text-blue-500 ml-1" />}
                </div>
                <p className="text-gray-500 text-sm">{user.username}</p>
              </div>

              <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => alert("Editar perfil")}>
                <Edit className="h-3.5 w-3.5 mr-1.5" />
                Editar Perfil
              </Button>
            </div>

            <div className="p-4 border-b">
              <p className="text-sm text-gray-700">{user.bio}</p>

              <div className="mt-3 space-y-2">
                <div className="flex items-center text-gray-600 text-xs">
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  {user.location}
                </div>
                <div className="flex items-center text-gray-600 text-xs">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  Entrou em {user.joinedDate}
                </div>
              </div>
            </div>

            <div className="p-4 flex justify-around">
              <div className="text-center">
                <div className="font-bold">{user.following}</div>
                <div className="text-xs text-gray-500">Seguindo</div>
              </div>
              <div className="text-center">
                <div className="font-bold">{user.followers}</div>
                <div className="text-xs text-gray-500">Seguidores</div>
              </div>
              <div className="text-center">
                <div className="font-bold">{userChecks.length}</div>
                <div className="text-xs text-gray-500">Checks</div>
              </div>
            </div>
          </div>

          {/* Main Content - Checks do usuário */}
          <div className="flex-1">
            <Tabs defaultValue="checks" className="bg-white rounded-lg shadow-sm">
              <TabsList className="w-full grid grid-cols-3 h-9 bg-gray-200">
                <TabsTrigger
                  value="checks"
                  className="text-xs py-1.5 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-blue-700"
                >
                  Meus Checks
                </TabsTrigger>
                <TabsTrigger
                  value="transactions"
                  className="text-xs py-1.5 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-blue-700"
                >
                  Transações
                </TabsTrigger>
                <TabsTrigger
                  value="saved"
                  className="text-xs py-1.5 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-blue-700"
                >
                  Salvos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="checks" className="p-0">
                <div className="p-3 flex items-center justify-between border-b">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">Checks Publicados</h3>
                    <Badge variant="outline" className="text-xs">
                      {userChecks.length}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Grid3X3 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <ListFilter className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3 p-3 bg-gray-50">
                  {userChecks.map((check) => (
                    <div
                      key={check.id}
                      className="bg-white p-3 rounded-md shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">{check.amount}</div>
                          <div className="text-sm text-gray-500">Taxa: {check.rate}</div>
                        </div>
                        <Badge
                          className={`${
                            check.status === "active"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-green-100 text-green-800 hover:bg-green-100"
                          }`}
                        >
                          {check.status === "active" ? "Ativo" : "Concluído"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        {check.banks.map((bank, index) => (
                          <div key={index} className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                            {bank}
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <div>Publicado {check.date}</div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {check.interactions} interações
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="transactions">
                <div className="p-4 text-center py-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Histórico de Transações</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Aqui você pode ver todas as suas transações concluídas e em andamento.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">Ver Histórico Completo</Button>
                </div>
              </TabsContent>

              <TabsContent value="saved">
                <div className="p-4 text-center py-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Checks Salvos</h3>
                  <p className="text-gray-500 text-sm mb-4">Você ainda não salvou nenhum check.</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">Explorar Ofertas</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Anúncios */}
          <div className="w-[300px] bg-white rounded-lg shadow-sm ml-4 h-fit">
            <AdvertisementSpace />
          </div>
        </div>
      </div>
    </div>
  )
}

