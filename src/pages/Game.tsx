import { MathGame } from '../components/game/MathGame';
import { SessionData } from '../components/game/types';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Game() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGameOver = (sessionData: SessionData) => {
    // Save game data to localStorage
    const existingData = JSON.parse(localStorage.getItem('bpmGameData') || '[]') as SessionData[];
    existingData.push(sessionData);
    localStorage.setItem('bpmGameData', JSON.stringify(existingData));
    
    toast({
      title: "Game completed!",
      description: `You scored ${sessionData.correct} out of ${sessionData.totalQuestions} questions.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            className="text-white hover:text-white/80"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="backdrop-blur-lg bg-card/30 rounded-lg shadow-xl p-8">
          <MathGame onGameOver={handleGameOver} />
        </div>
      </div>
    </div>
  );
}