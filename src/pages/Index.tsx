import { useState } from "react";
import { BpmVisualizer } from "@/components/BpmVisualizer";
import { TestCard } from "@/components/TestCard";
import { Button } from "@/components/ui/button";
import { Music, Brain, Zap, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [currentBpm] = useState(80);

  const handleTestStart = () => {
    toast({
      title: "Coming Soon",
      description: "This feature will be available in the next update!",
    });
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C] via-primary/20 to-background" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              FlowFrequency
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
              Discover your optimal performance rhythm
            </p>
            <div className="max-w-lg mx-auto mb-12">
              <BpmVisualizer bpm={currentBpm} />
            </div>
            <Button
              size="lg"
              onClick={handleTestStart}
              className="animate-pulse hover:animate-none bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300"
            >
              Start Test Now
              <Sparkles className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TestCard
              title="Solve & Play"
              description="Take a quick test solving a problem or playing a game while we analyze your performance."
              icon="rocket"
            />
            <TestCard
              title="Feel the Beat"
              description="Complete tasks while listening to music at different BPM ranges."
              icon="headphones"
            />
            <TestCard
              title="Optimize Performance"
              description="Identify the beats that drive your best results through data analysis."
              icon="zap"
            />
            <TestCard
              title="Get Recommendations"
              description="Receive personalized music suggestions to enhance your future performance."
              icon="sparkles"
            />
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 animate-float">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Rhythm Analysis</h3>
              <p className="text-muted-foreground">Track your performance across different BPM ranges</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 animate-float">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cognitive Testing</h3>
              <p className="text-muted-foreground">Measure your focus and problem-solving abilities</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 animate-float">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Feedback</h3>
              <p className="text-muted-foreground">Get instant insights about your performance</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 animate-float">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-muted-foreground">Personalized music suggestions based on your data</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;