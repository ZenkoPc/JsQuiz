import { create } from "zustand"

interface Quantity {
    questions: number
    setQuantity: (quantity: number) => void
}

export const useQuestionQuantity = create<Quantity>((set,get) => {
    return {
        questions: 5,
        setQuantity: (quantity: number) => {
            const { questions } = get()
            if(questions === quantity) return
            set({ questions: quantity })
        }
    }
})