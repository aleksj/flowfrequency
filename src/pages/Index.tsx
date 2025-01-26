import { useState } from "react";
import { BpmVisualizer } from "@/components/BpmVisualizer";
import { Button } from "@/components/ui/button";
import { Music, Brain, Zap, Sparkles, Headphones, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();
  const [currentBpm] = useState(80);
  const navigate = useNavigate();

  const handleTestStart = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Headphones className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1EAEDB] via-[#0FA0CE] to-accent">
                FlowFrequency
              </h1>
            </div>
            <Button
              variant="outline"
              className="border-primary hover:bg-primary/20 text-white"
              onClick={handleTestStart}
            >
              Login with Google
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-black" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-white">
              Discover your optimal performance beat
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8">
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
              className="bg-gradient-to-r from-[#1EAEDB] via-[#0FA0CE] to-accent hover:opacity-90 transition-all duration-300 text-white"
            >
              Start Your Test Now
              <Sparkles className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Focus Measurement Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-100">
              Measure Your Focus & Problem-Solving
            </h2>
            <p className="text-lg text-gray-300">
              Take our interactive test to discover how different beats affect your cognitive performance
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card glass p-6 rounded-lg border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <Brain className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold text-white">Focus Assessment</h3>
              </div>
              <p className="text-gray-300">
                Complete engaging tasks while listening to different rhythms to measure your concentration levels
              </p>
            </div>
            <div className="bg-card glass p-6 rounded-lg border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <Zap className="w-8 h-8 text-secondary" />
                <h3 className="text-xl font-semibold text-white">Problem-Solving</h3>
              </div>
              <p className="text-gray-300">
                Solve cognitive challenges as we analyze how various beats influence your problem-solving abilities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Science Behind Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            The Science Behind It
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card glass p-8 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-white">Cognitive Rhythm Synchronization</h3>
              <p className="text-gray-300">
                Research shows that our brain's cognitive performance can be enhanced when we match our work rhythm with the right musical tempo. This synchronization can lead to improved focus, productivity, and creative output.
              </p>
            </div>
            <div className="bg-card glass p-8 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-white">Neural Entrainment</h3>
              <p className="text-gray-300">
                Through a process called neural entrainment, our brains naturally synchronize with external rhythms. By identifying your optimal beat frequency, we can help you maintain peak performance states for longer periods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Try It Now Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Ready to Find Your Beat?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Start your journey to enhanced productivity through personalized rhythm optimization
          </p>
          <Button
            size="lg"
            onClick={handleTestStart}
            className="bg-gradient-to-r from-[#1EAEDB] via-[#0FA0CE] to-accent hover:opacity-90 transition-all duration-300 text-white"
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