import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MusicGenerator } from '../../lib/audio/MusicGenerator';
import { Question, Performance, SessionData } from './types';
import { generateQuestions, optimizeBpm, shouldEvaluateBpm, gameConfig } from './gameLogic';
import { Card } from '@/components/ui/card';
import { Brain, Music, Zap } from 'lucide-react';

interface MathGameProps {
    onGameOver?: (sessionData: SessionData) => void;
}

export function MathGame({ onGameOver }: MathGameProps) {
    // Game state
    const [currentBpm, setCurrentBpm] = useState(gameConfig.minBpm);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [startTime, setStartTime] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [responseTimes, setResponseTimes] = useState<number[]>([]);
    const [performanceHistory, setPerformanceHistory] = useState<Performance[]>([]);
    const [optimalBpm, setOptimalBpm] = useState(gameConfig.minBpm);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Audio state
    const [isAudioLoading, setIsAudioLoading] = useState(true);
    const musicRef = useRef<MusicGenerator | null>(null);

    // Initialize game and audio
    useEffect(() => {
        const initGame = async () => {
            setIsLoading(true);
            const qs = generateQuestions();
            setQuestions(qs);

            try {
                musicRef.current = new MusicGenerator({
                    tempo: gameConfig.minBpm,
                    masterVolume: 0.2
                });
                musicRef.current.start();
                setIsAudioLoading(false);
            } catch (e) {
                console.error('Audio initialization failed:', e);
                setIsAudioLoading(false);
            }

            setIsLoading(false);
        };

        initGame();

        return () => {
            if (musicRef.current) {
                musicRef.current.stop();
            }
        };
    }, []);

    // Handle answer submission
    const handleAnswer = useCallback((userAnswer: number) => {
        if (isLoading || !questions[currentQuestion]) return;

        const endTime = Date.now();
        const timeTaken = endTime - startTime;
        setResponseTimes(prev => [...prev, timeTaken]);

        const isCorrect = userAnswer === questions[currentQuestion].answer;
        if (isCorrect) setCorrectCount(prev => prev + 1);

        const newPerformance: Performance = {
            responseTime: timeTaken,
            isCorrect,
            bpm: currentBpm
        };
        setPerformanceHistory(prev => [...prev, newPerformance]);

        if (shouldEvaluateBpm(currentQuestion)) {
            const newBpm = optimizeBpm(currentBpm, [...performanceHistory, newPerformance]);
            setCurrentBpm(newBpm);
            if (musicRef.current) {
                musicRef.current.setTempo(newBpm);
            }
        }

        if (currentQuestion < gameConfig.numQuestions - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            const sessionData: SessionData = {
                timestamp: new Date().toISOString(),
                startBpm: gameConfig.minBpm,
                endBpm: currentBpm,
                correct: isCorrect ? correctCount + 1 : correctCount,
                totalQuestions: gameConfig.numQuestions,
                responseTimes: [...responseTimes, timeTaken],
                performanceHistory: [...performanceHistory, newPerformance],
                optimalBpm: currentBpm
            };

            if (onGameOver) {
                onGameOver(sessionData);
            }
            setIsGameOver(true);
        }
    }, [
        isLoading,
        questions,
        currentQuestion,
        startTime,
        currentBpm,
        correctCount,
        responseTimes,
        performanceHistory,
        optimalBpm,
        onGameOver
    ]);

    // Handle keyboard input
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isGameOver || isLoading || !questions[currentQuestion]) return;
            const key = e.key;
            if (['1', '2', '3', '4'].includes(key)) {
                e.preventDefault();
                handleAnswer(parseInt(key, 10));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isGameOver, isLoading, questions, currentQuestion, handleAnswer]);

    // Start timing for each question
    useEffect(() => {
        setStartTime(Date.now());
    }, [currentQuestion]);

    if (isLoading || !questions[currentQuestion]) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading game...</p>
                </div>
            </div>
        );
    }

    if (isGameOver) {
        const avgResponseTime = Math.round(
            responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
        );
        const accuracy = (correctCount / gameConfig.numQuestions) * 100;

        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Card className="max-w-md w-full p-8 bg-card glass border border-white/10">
                    <h1 className="text-2xl font-bold mb-6 text-foreground">Game Over!</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-primary/20">
                                <Brain className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Accuracy</p>
                                <h3 className="text-2xl font-bold text-foreground">{accuracy.toFixed(1)}%</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-secondary/20">
                                <Music className="w-6 h-6 text-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Final BPM</p>
                                <h3 className="text-2xl font-bold text-foreground">{currentBpm.toFixed(1)}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2 text-muted-foreground">
                        <p>Score: {correctCount} / {gameConfig.numQuestions}</p>
                        <p>Average response: {avgResponseTime}ms</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <p className="text-sm text-muted-foreground">Try searching YouTube for:</p>
                        <p className="text-foreground font-medium">LoFi music {Math.round(currentBpm)} bpm</p>
                    </div>
                </Card>
            </div>
        );
    }

    const { expression } = questions[currentQuestion];
    const progress = (currentQuestion / gameConfig.numQuestions) * 100;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black p-8">
            <Card className="w-full max-w-2xl bg-card glass border border-white/10 p-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col space-y-2 w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-primary/20">
                                    <Zap className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Current BPM</p>
                                    <h3 className="text-2xl font-bold text-foreground">{Math.round(currentBpm)}</h3>
                                </div>
                            </div>
                            {isAudioLoading && (
                                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                            )}
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-primary transition-all duration-300"
                                style={{ 
                                    width: `${((currentBpm - gameConfig.minBpm) / (gameConfig.maxBpm - gameConfig.minBpm)) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="w-full h-2 bg-muted rounded-full">
                        <div 
                            className="bg-secondary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-2">
                        Question {currentQuestion + 1} of {gameConfig.numQuestions}
                    </p>
                </div>

                <div className="mb-8">
                    <div className="text-4xl font-bold text-center py-8 bg-card/50 rounded-lg border border-white/5">
                        {expression} = ?
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {gameConfig.possibleAnswers.map((num) => (
                        <button
                            key={num}
                            onClick={() => handleAnswer(num)}
                            className="bg-card/50 border border-white/10 rounded-lg p-6 text-2xl font-bold hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                        >
                            {num}
                        </button>
                    ))}
                </div>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                    Press 1-4 on your keyboard to answer
                </div>
            </Card>
        </div>
    );
}