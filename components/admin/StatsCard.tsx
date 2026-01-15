import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: "up" | "down";
  };
  icon: LucideIcon;
  color: "blue" | "green" | "purple" | "orange" | "red";
  href?: string;
}

const colorMap = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600",
  red: "from-red-500 to-red-600",
};

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  href
}: StatsCardProps) {
  const gradient = colorMap[color];

  const content = (
    <div className={`bg-gradient-to-br ${gradient} rounded-xl p-6 text-white transition-transform hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90 font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-3 text-sm ${change.trend === "up" ? "text-green-200" : "text-red-200"
              }`}>
              {change.trend === "up" ? "↑" : "↓"}
              <span>{change.value}</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-white/20 rounded-lg">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}