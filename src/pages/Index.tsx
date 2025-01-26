import { useState } from "react";
import { BpmVisualizer } from "@/components/BpmVisualizer";
import { Button } from "@/components/ui/button";
import { Music, Brain, Zap, Sparkles, Headphones, ArrowRight, LogIn } from "lucide-react";
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Headphones className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                FlowFrequency
              </h1>
            </div>
            <Button
              onClick={handleTestStart}
              className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all duration-300"
            >
              <LogIn className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-black" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              Discover your optimal performance beat
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
              Start Your Test Now
              <Sparkles className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Focus Measurement Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              Measure Your Focus & Problem-Solving
            </h2>
            <p className="text-lg text-muted-foreground">
              Take our interactive test to discover how different beats affect your cognitive performance
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card glass p-6 rounded-lg border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <Brain className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold">Focus Assessment</h3>
              </div>
              <p className="text-muted-foreground">
                Complete engaging tasks while listening to different rhythms to measure your concentration levels
              </p>
            </div>
            <div className="bg-card glass p-6 rounded-lg border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <Zap className="w-8 h-8 text-secondary" />
                <h3 className="text-xl font-semibold">Problem-Solving</h3>
              </div>
              <p className="text-muted-foreground">
                Solve cognitive challenges as we analyze how various beats influence your problem-solving abilities
              </p>
            </div>
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
            
            {/* Steps */}
            <div className="flex-1 relative z-10">
              <div className="bg-card glass p-6 rounded-lg border border-white/10 h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4 mx-auto">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Take the Test</h3>
                <p className="text-muted-foreground text-center">Complete our cognitive assessment with varying beats</p>
              </div>
            </div>

            <div className="flex-1 relative z-10">
              <div className="bg-card glass p-6 rounded-lg border border-white/10 h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/20 mb-4 mx-auto">
                  <span className="text-xl font-bold text-secondary">2</span>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Find Your Beat</h3>
                <p className="text-muted-foreground text-center">Discover your optimal performance frequency</p>
              </div>
            </div>

            <div className="flex-1 relative z-10">
              <div className="bg-card glass p-6 rounded-lg border border-white/10 h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mb-4 mx-auto">
                  <span className="text-xl font-bold text-accent">3</span>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Get Your Playlist</h3>
                <p className="text-muted-foreground text-center">Receive a curated playlist matching your optimal beat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science Behind Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-primary/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            The Science Behind It
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card glass p-8 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Cognitive Rhythm Synchronization</h3>
              <p className="text-muted-foreground">
                Research shows that our brain's cognitive performance can be enhanced when we match our work rhythm with the right musical tempo. This synchronization can lead to improved focus, productivity, and creative output.
              </p>
            </div>
            <div className="bg-card glass p-8 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Neural Entrainment</h3>
              <p className="text-muted-foreground">
                Through a process called neural entrainment, our brains naturally synchronize with external rhythms. By identifying your optimal beat frequency, we can help you maintain peak performance states for longer periods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Try It Now Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-black to-primary/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            Ready to Find Your Beat?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Start your journey to enhanced productivity through personalized rhythm optimization
          </p>
          <Button
            size="lg"
            onClick={handleTestStart}
            className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all duration-300"
          >
            Start Your Test Now
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
