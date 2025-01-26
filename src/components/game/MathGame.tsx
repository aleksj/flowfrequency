import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MusicGenerator } from '../../lib/audio/MusicGenerator';
import { Question, Performance, SessionData } from './types';
import { generateQuestions, optimizeBpm, shouldEvaluateBpm, gameConfig } from './gameLogic';

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
                optimalBpm
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p>Loading game...</p>
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4">Game Over!</h1>
                    <p className="mb-2">You got {correctCount} out of {gameConfig.numQuestions} correct.</p>
                    <p className="mb-2">Accuracy: {accuracy.toFixed(1)}%</p>
                    <p className="mb-2">Average response time: {avgResponseTime}ms</p>
                    <p className="mb-2">Starting BPM: {gameConfig.minBpm}</p>
                    <p className="mb-2">Ending BPM: {currentBpm.toFixed(1)}</p>
                    <p className="mb-4">Optimal BPM: {optimalBpm.toFixed(1)}</p>
                </div>
            </div>
        );
    }

    const { expression } = questions[currentQuestion];
    const progress = (currentQuestion / gameConfig.numQuestions) * 100;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-2xl font-bold">Current BPM: {Math.round(currentBpm)}</h1>
                        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-blue-500 transition-all duration-300"
                                style={{ 
                                    width: `${((currentBpm - gameConfig.minBpm) / (gameConfig.maxBpm - gameConfig.minBpm)) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                    {isAudioLoading && (
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                    )}
                </div>

                <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Question {currentQuestion + 1} of {gameConfig.numQuestions}
                    </p>
                </div>

                <div className="mb-8">
                    <div className="text-3xl font-bold text-center py-4 bg-gray-50 rounded">
                        {expression} = ?
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {gameConfig.possibleAnswers.map((num) => (
                        <button
                            key={num}
                            onClick={() => handleAnswer(num)}
                            className="bg-white border-2 border-gray-300 rounded-lg p-4 text-2xl font-bold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {num}
                        </button>
                    ))}
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                    Press 1-4 on your keyboard to answer
                </div>
            </div>
        </div>
    );
}
