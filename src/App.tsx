<<<<<<< Updated upstream
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
=======
import { MathGame } from './components/game/MathGame';
import { SessionData } from './components/game/types';
>>>>>>> Stashed changes

function App() {
  const handleGameOver = (sessionData: SessionData) => {
    // Save game data to localStorage
    const existingData = JSON.parse(localStorage.getItem('bpmGameData') || '[]') as SessionData[];
    existingData.push(sessionData);
    localStorage.setItem('bpmGameData', JSON.stringify(existingData));
  };

<<<<<<< Updated upstream
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
=======
  return (
    <div className="min-h-screen bg-gray-100">
      <MathGame onGameOver={handleGameOver} />
    </div>
  );
}
>>>>>>> Stashed changes

export default App;