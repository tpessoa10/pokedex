interface StatBarProps {
  label?: string;
  value: number;
  max?: number;
}

export function StatBar({ label, value, max = 255 }: StatBarProps) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full mb-2">
      <div className="flex justify-between text-sm font-medium">
        <span>{label}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
        <div
          className="h-3 rounded-full transition-all duration-300"
          style={{
            width: `${percent}%`,
            backgroundColor:
              value < 50
                ? "#f87171" 
                : value < 100
                ? "#facc15" 
                : "#4ade80", 
          }}
        />
      </div>
    </div>
  );
}