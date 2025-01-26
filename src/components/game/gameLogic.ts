import { Question, Performance, GameConfig } from './types';

const DEFAULT_CONFIG: GameConfig = {
    numQuestions: 100,
    minBpm: 80,
    maxBpm: 120,
    evaluationInterval: 5,
    performanceWindow: 5,
    possibleAnswers: [1, 2, 3, 4]
};

export function generateQuestion(possibleAnswers: number[] = DEFAULT_CONFIG.possibleAnswers): Question {
    const targetAnswer = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
    const operations = [
        // Addition: a + b = target
        () => {
            const b = Math.floor(Math.random() * (targetAnswer - 1)) + 1;
            return { expression: `${targetAnswer - b} + ${b}`, answer: targetAnswer };
        },
        // Subtraction: a - b = target
        () => {
            const a = targetAnswer + Math.floor(Math.random() * 5) + 1;
            return { expression: `${a} - ${a - targetAnswer}`, answer: targetAnswer };
        },
        // Multiplication: a * b = target
        () => {
            const factors = [];
            for (let i = 1; i <= targetAnswer; i++) {
                if (targetAnswer % i === 0) factors.push(i);
            }
            const b = factors[Math.floor(Math.random() * factors.length)];
            return { expression: `${targetAnswer / b} × ${b}`, answer: targetAnswer };
        },
        // Division: a / b = target
        () => {
            const b = Math.floor(Math.random() * 3) + 1;
            return { expression: `${targetAnswer * b} ÷ ${b}`, answer: targetAnswer };
        }
    ];

    return operations[Math.floor(Math.random() * operations.length)]();
}

export function generateQuestions(count: number = DEFAULT_CONFIG.numQuestions): Question[] {
    return Array.from({ length: count }, () => generateQuestion());
}

export function calculatePerformanceScore(performances: Performance[]): number {
    if (performances.length === 0) return 0;
    
    const avgResponseTime = performances.reduce((sum, p) => sum + p.responseTime, 0) / performances.length;
    const accuracy = performances.filter(p => p.isCorrect).length / performances.length;
    
    // Normalize response time (lower is better)
    const normalizedTime = Math.max(0, 1 - (avgResponseTime / 3000));
    
    // Weight accuracy more heavily than speed
    return accuracy * 0.7 + normalizedTime * 0.3;
}

export function optimizeBpm(
    currentBpm: number,
    performances: Performance[],
    config: GameConfig = DEFAULT_CONFIG
): number {
    const recentPerformances = performances.slice(-config.performanceWindow);
    const score = calculatePerformanceScore(recentPerformances);

    // Adjust BPM based on performance score
    let bpmChange = 0;
    if (score > 0.8) { // Excellent performance
        bpmChange = 10;
    } else if (score > 0.6) { // Good performance
        bpmChange = 5;
    } else if (score < 0.4) { // Poor performance
        bpmChange = -10;
    } else if (score < 0.6) { // Below average performance
        bpmChange = -5;
    }

    return Math.min(config.maxBpm, Math.max(config.minBpm, currentBpm + bpmChange));
}

export function shouldEvaluateBpm(
    questionIndex: number,
    config: GameConfig = DEFAULT_CONFIG
): boolean {
    return (questionIndex + 1) % config.evaluationInterval === 0;
}

export const gameConfig = DEFAULT_CONFIG;
