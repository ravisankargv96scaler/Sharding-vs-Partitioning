export interface Tab {
    id: string;
    label: string;
    shortLabel: string;
}

export type Theme = 'light' | 'dark';

export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
}
