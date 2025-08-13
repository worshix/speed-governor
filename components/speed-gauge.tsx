"use client"

interface SpeedGaugeProps {
  currentSpeed: number
  speedLimit: number
}

export function SpeedGauge({ currentSpeed, speedLimit }: SpeedGaugeProps) {
  const maxSpeed = 120
  const speedPercentage = (currentSpeed / maxSpeed) * 100
  const limitPercentage = (speedLimit / maxSpeed) * 100
  const isOverLimit = currentSpeed > speedLimit

  // Calculate the rotation angle for the needle (0-180 degrees)
  const needleRotation = (speedPercentage / 100) * 180

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Gauge */}
      <div className="relative w-48 h-24">
        {/* Background arc */}
        <svg className="w-full h-full" viewBox="0 0 200 100">
          {/* Background arc */}
          <path d="M 20 80 A 80 80 0 0 1 180 80" fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round" />

          {/* Speed limit arc */}
          <path
            d={`M 20 80 A 80 80 0 0 1 ${20 + (160 * limitPercentage) / 100} ${80 - Math.sin((limitPercentage / 100) * Math.PI) * 80}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Over limit arc */}
          {isOverLimit && (
            <path
              d={`M ${20 + (160 * limitPercentage) / 100} ${80 - Math.sin((limitPercentage / 100) * Math.PI) * 80} A 80 80 0 0 1 ${20 + (160 * speedPercentage) / 100} ${80 - Math.sin((speedPercentage / 100) * Math.PI) * 80}`}
              fill="none"
              stroke="#ef4444"
              strokeWidth="12"
              strokeLinecap="round"
            />
          )}

          {/* Needle */}
          <line
            x1="100"
            y1="80"
            x2="100"
            y2="30"
            stroke={isOverLimit ? "#ef4444" : "#374151"}
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${needleRotation - 90} 100 80)`}
          />

          {/* Center dot */}
          <circle cx="100" cy="80" r="4" fill={isOverLimit ? "#ef4444" : "#374151"} />

          {/* Speed markers */}
          {[0, 20, 40, 60, 80, 100, 120].map((speed, index) => {
            const angle = (speed / maxSpeed) * 180 - 90
            const x1 = 100 + Math.cos((angle * Math.PI) / 180) * 70
            const y1 = 80 + Math.sin((angle * Math.PI) / 180) * 70
            const x2 = 100 + Math.cos((angle * Math.PI) / 180) * 75
            const y2 = 80 + Math.sin((angle * Math.PI) / 180) * 75

            return (
              <g key={speed}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6b7280" strokeWidth="2" />
                <text
                  x={100 + Math.cos((angle * Math.PI) / 180) * 85}
                  y={80 + Math.sin((angle * Math.PI) / 180) * 85}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs fill-gray-600"
                >
                  {speed}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Speed display */}
      <div className="text-center">
        <div className={`text-4xl font-bold ${isOverLimit ? "text-red-600" : "text-gray-900"}`}>{currentSpeed}</div>
        <div className="text-sm text-gray-600">km/h</div>
        <div className={`text-sm font-medium mt-1 ${isOverLimit ? "text-red-600" : "text-green-600"}`}>
          Limit: {speedLimit} km/h
        </div>
      </div>
    </div>
  )
}
