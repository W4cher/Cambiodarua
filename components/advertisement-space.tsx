interface AdvertisementSpaceProps {
  maxAds?: number
  showLastTwo?: boolean
}

export default function AdvertisementSpace({ maxAds, showLastTwo }: AdvertisementSpaceProps) {
  const ads = [
    {
      id: 1,
      title: "Banco Nacional",
      description: "Melhores taxas de câmbio para suas transações internacionais",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 2,
      title: "Transferências Rápidas",
      description: "Envie dinheiro para qualquer lugar do mundo em minutos",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 3,
      title: "Seguro de Viagem",
      description: "Proteja-se em suas viagens internacionais",
      image: "/placeholder.svg?height=120&width=200",
    },
  ]

  // Determinar quais anúncios mostrar
  let displayAds
  if (showLastTwo) {
    // Mostrar apenas os dois últimos anúncios
    displayAds = ads.slice(-2)
  } else if (maxAds) {
    // Limitar o número de anúncios se maxAds for fornecido
    displayAds = ads.slice(0, maxAds)
  } else {
    // Mostrar todos os anúncios
    displayAds = ads
  }

  return (
    <div className="p-2">
      <div className="space-y-3">
        {displayAds.map((ad) => (
          <div
            key={ad.id}
            className="rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="bg-gray-100 p-2 text-gray-700">
              <h3 className="font-bold text-xs">{ad.title}</h3>
            </div>
            <div className="p-0">
              <img src={ad.image || "/placeholder.svg"} alt={ad.title} className="w-full h-auto" />
            </div>
            <div className="p-2 bg-white border border-t-0 border-gray-200 rounded-b-md">
              <p className="text-xs text-gray-600">{ad.description}</p>
              <button className="mt-1 text-xs font-medium text-gray-600 hover:underline">Saiba mais →</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-gray-100 rounded-md p-2 text-center">
        <p className="text-xs text-gray-500 mb-1">Interessado em anunciar?</p>
        <button className="text-xs font-medium text-gray-600 hover:underline">Clique aqui para mais informações</button>
      </div>
    </div>
  )
}

