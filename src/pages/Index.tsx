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
    <div className="min-h-screen w-full bg-black text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                FlowFrequency
              </h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-black" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              Discover your optimal performance rhythm
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
              Enhance your productivity with personalized music recommendations
            </p>
          </div>
          
          <div className="w-full mt-12 mb-16">
            <BpmVisualizer bpm={currentBpm} />
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleTestStart}
              className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all duration-300"
            >
              Solve & Play
              <Sparkles className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/50">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
          How It Works
        </h2>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 relative">
            {/* Line connecting the steps */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent transform -translate-y-1/2 z-0" />
            
            {/* Step 1 */}
            <div className="flex-1 relative z-10">
              <div className="bg-card glass p-6 rounded-lg border border-white/10 h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4 mx-auto">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Take the Test</h3>
                <p className="text-muted-foreground text-center">Quick cognitive test with different music tempos</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 relative z-10">
              <div className="bg-card glass p-6 rounded-lg border border-white/10 h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/20 mb-4 mx-auto">
                  <span className="text-xl font-bold text-secondary">2</span>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Analyze Results</h3>
                <p className="text-muted-foreground text-center">Find your optimal performance tempo</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 relative z-10">
              <div className="bg-card glass p-6 rounded-lg border border-white/10 h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mb-4 mx-auto">
                  <span className="text-xl font-bold text-accent">3</span>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Get Your Playlist</h3>
                <p className="text-muted-foreground text-center">Receive personalized music recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Rhythm Analysis</h3>
              <p className="text-muted-foreground">Track your performance across different BPM ranges</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cognitive Testing</h3>
              <p className="text-muted-foreground">Measure your focus and problem-solving abilities</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Feedback</h3>
              <p className="text-muted-foreground">Get instant insights about your performance</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
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