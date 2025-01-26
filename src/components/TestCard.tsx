import { Rocket, Headphones, Zap, Sparkles, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestCardProps {
  title: string;
  description: string;
  icon: "rocket" | "headphones" | "zap" | "sparkles";
}

export const TestCard = ({ title, description, icon }: TestCardProps) => {
  const icons: Record<string, LucideIcon> = {
    rocket: Rocket,
    headphones: Headphones,
    zap: Zap,
    sparkles: Sparkles
  };

  const IconComponent = icons[icon];

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl p-6 bg-card glass cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/10"
    >
      <div className="relative z-10">
        <div className="mb-4 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};