interface MobileAdProps {
  ad: {
    id: number
    title: string
    description: string
    image: string
    link: string
  }
}

export default function MobileAdUnit({ ad }: MobileAdProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden my-4">
      <div className="p-0">
        <img src={ad.image || "/placeholder.svg"} alt={ad.title} className="w-full h-auto" />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm mb-1">{ad.title}</h3>
        <p className="text-xs text-gray-600 mb-2">{ad.description}</p>
        <a href={ad.link} className="text-xs font-medium text-blue-600 hover:underline inline-block">
          Saiba mais →
        </a>
      </div>
    </div>
  )
}
