export interface Question {
    expression: string;
    answer: number;
}

export interface Performance {
    responseTime: number;
    isCorrect: boolean;
    bpm: number;
}

export interface SessionData {
    timestamp: string;
    startBpm: number;
    endBpm: number;
    correct: number;
    totalQuestions: number;
    responseTimes: number[];
    performanceHistory: Performance[];
    optimalBpm: number;
}

export interface GameConfig {
    numQuestions: number;
    minBpm: number;
    maxBpm: number;
    evaluationInterval: number;
    performanceWindow: number;
    possibleAnswers: number[];
}
