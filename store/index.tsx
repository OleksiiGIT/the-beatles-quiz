import { create } from 'zustand'

export type QuizAnswerType = {
    questionId: number; // imageId
    guessesCount: number;
}

export type UserType = {
    name: string;
    email: string;
}

type StoreType = {
    user: UserType | null;
    quizAnswers: QuizAnswerType[];
    addQuizAnswer: (answer: QuizAnswerType) => void;
    addUser: (user: UserType) => void;
    cleanup: () => void;
}

export const useStore = create<StoreType>((set) => ({
    user: null,
    quizAnswers: [],
    addQuizAnswer: (answer: QuizAnswerType) => set((state) => ({
        quizAnswers: state.quizAnswers.some(a => a.questionId === answer.questionId)
            ? state.quizAnswers.map(a => a.questionId === answer.questionId ? answer : a)
            : [...state.quizAnswers, answer]
    })),
    addUser: (user: UserType) => set(() => ({ user })),
    cleanup: () => set(() => ({ user: null, quizAnswers: [] }))
}))