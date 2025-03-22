export default function AssetsGauge() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">ACTIVOS</h2>
        <button className="text-gray-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="currentColor" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-48 h-24">
          {/* Gauge background */}
          <div className="absolute inset-0 rounded-t-full overflow-hidden bg-gray-200"></div>

          {/* Gauge segments */}
          <div
            className="absolute inset-0 rounded-t-full overflow-hidden"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
              background: "conic-gradient(from 180deg, #4ade80 0deg, #a78bfa 180deg, #93c5fd 270deg, #4ade80 360deg)",
            }}
          ></div>

          {/* Gauge center white circle */}
          <div className="absolute inset-0 rounded-t-full overflow-hidden flex items-center justify-center">
            <div className="bg-white w-32 h-16 rounded-t-full"></div>
          </div>
        </div>

        <div className="text-center mt-4">
          <div className="text-2xl font-bold">120 170 ₽</div>
        </div>
      </div>
    </div>
  )
}

