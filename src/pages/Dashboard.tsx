import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Music, Zap, LineChart, History, Settings } from "lucide-react";
import { TestCard } from "@/components/TestCard";
import { useEffect, useState } from "react";
import { SessionData } from "@/components/game/types";

const Dashboard = () => {
  const [gameData, setGameData] = useState<SessionData[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('bpmGameData');
    if (savedData) {
      setGameData(JSON.parse(savedData));
    }
  }, []);

  const lastSession = gameData[gameData.length - 1];

  return (
    <div className="min-h-screen w-full bg-black text-white">
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
                  <p className="text-sm text-white/60">Focus Score</p>
                  <h3 className="text-2xl font-bold text-white">
                    {lastSession ? `${((lastSession.correct / lastSession.totalQuestions) * 100).toFixed(1)}%` : 'N/A'}
                  </h3>
                </div>
              </div>
            </Card>
            <Card className="bg-card glass p-6 border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-secondary/20">
                  <Music className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Optimal BPM</p>
                  <h3 className="text-2xl font-bold text-white">
                    {lastSession ? Math.round(lastSession.optimalBpm) : 'N/A'}
                  </h3>
                </div>
              </div>
            </Card>
            <Card className="bg-card glass p-6 border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-accent/20">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Tests Completed</p>
                  <h3 className="text-2xl font-bold text-white">{gameData.length}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Graph */}
          <Card className="bg-card glass p-6 border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Performance History</h2>
              <Button variant="outline" size="sm" className="border-white/10 text-white">
                <History className="mr-2 h-4 w-4" />
                View All
              </Button>
            </div>
            {lastSession ? (
              <div className="space-y-4 text-white">
                <p>Last Session Details:</p>
                <ul className="space-y-2 text-white/60">
                  <li>Score: {lastSession.correct} / {lastSession.totalQuestions}</li>
                  <li>Average Response Time: {Math.round(lastSession.responseTimes.reduce((a, b) => a + b, 0) / lastSession.responseTimes.length)}ms</li>
                  <li>Starting BPM: {lastSession.startBpm}</li>
                  <li>Ending BPM: {lastSession.endBpm}</li>
                </ul>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-white/60">
                No performance data available yet
              </div>
            )}
          </Card>

          {/* Recent Tests */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TestCard
                title="Focus Test"
                description="Test your concentration with varying rhythms"
                icon="rocket"
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
              onClick={() => window.location.href = '/game'}
              className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all duration-300 text-white"
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
