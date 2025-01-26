import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Music, Zap, LineChart, History, Settings } from "lucide-react";
import { TestCard } from "@/components/TestCard";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-black text-foreground">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Music className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                FlowFrequency Dashboard
              </h1>
            </div>
            <Button
              variant="outline"
              className="border-primary hover:bg-primary/20"
            >
              Settings
              <Settings className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card glass p-6 border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/20">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Focus Score</p>
                  <h3 className="text-2xl font-bold">85%</h3>
                </div>
              </div>
            </Card>
            <Card className="bg-card glass p-6 border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-secondary/20">
                  <Music className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Optimal BPM</p>
                  <h3 className="text-2xl font-bold">120</h3>
                </div>
              </div>
            </Card>
            <Card className="bg-card glass p-6 border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-accent/20">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tests Completed</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
              </div>
            </Card>
          </div>

          {/* Performance Graph */}
          <Card className="bg-card glass p-6 border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Performance History</h2>
              <Button variant="outline" size="sm" className="border-white/10">
                <History className="mr-2 h-4 w-4" />
                View All
              </Button>
            </div>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Performance graph will be implemented here
            </div>
          </Card>

          {/* Recent Tests */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TestCard
                title="Focus Test"
                description="Test your concentration with varying rhythms"
                icon="brain"
              />
              <TestCard
                title="Memory Test"
                description="Measure memory retention with music"
                icon="sparkles"
              />
              <TestCard
                title="Reaction Test"
                description="Test reaction time with different beats"
                icon="zap"
              />
            </div>
          </div>

          {/* Start New Test */}
          <div className="flex justify-center pt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all duration-300"
            >
              Start New Test
              <LineChart className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;