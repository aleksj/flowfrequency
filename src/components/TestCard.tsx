import { ArrowRight } from "lucide-react";

interface TestCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export const TestCard = ({ title, description, onClick }: TestCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl p-6 bg-card glass cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/10"
    >
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center text-primary">
          <span className="mr-2">Start Test</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};