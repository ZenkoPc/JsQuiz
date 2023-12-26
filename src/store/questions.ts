import { create } from "zustand";
import { type Question } from '../types'
import confetti from 'canvas-confetti'
import { persist, devtools } from "zustand/middleware";
import { getAllQuestions } from "../services/questions";

interface State {
    questions: Question[]
    currentQuestion: number
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: () => void
    goPreviousQuestion: () => void
    reset: () => void
    progress: number
    quantity: number
}

export const useQuestionsStore = create<State>()(devtools(persist((set, get) => {

    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
            const json = await getAllQuestions()

            const questions = json.sort(() => Math.random() - 0.5).slice(0,limit)
            set({ questions }, false, 'fetchQuestions')
        },
        progress: 0,
        quantity: 0,
        selectAnswer: (questionId: number, answerId: number) => {
            const { questions, quantity, progress } = get()
            //copia del array de preguntas
            const newQuestions = structuredClone(questions)
            //se encuentra el index de la pregunta
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            //se obtiene la pregunta
            const questionInfo = newQuestions[questionIndex]
            //se valida si es o no es correcto
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerId
            if(isCorrectUserAnswer) confetti()
            //set new info
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerId
            }
            if(questions.length === 5) set({ progress: progress + 20 })
            if(questions.length === 25) set({ progress: progress + 4 })
            if(questions.length === 40) set({ progress: progress + 2.5 })

            set({ questions: newQuestions }, false, 'selectedAnswer')
            set({ quantity: quantity + 1 })
        },
        goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if(nextQuestion < questions.length){
                set({ currentQuestion: nextQuestion })
            }
        },
        goPreviousQuestion: () => {
            const { currentQuestion, questions } = get()
            const previousQuestion = currentQuestion - 1

            if(previousQuestion < questions.length){
                set({ currentQuestion: previousQuestion })
            }
        },
        reset: () => {
            set({ currentQuestion: 0, questions: [], progress: 0, quantity: 0 })
        }
    }
}, {
    name: 'questions'
})))
