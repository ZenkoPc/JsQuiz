import { Button } from "@mui/material"
import { useQuestionsData } from "../hooks/useQuestionsData"
import { useQuestionsStore } from "../store/questions"

export const Footer = () => {
    const { correct, incorrect, unanswered } = useQuestionsData()
    const reset = useQuestionsStore(state => state.reset)

    return (
        <footer style={{ marginTop:'16px' }}>
            <strong>
                {`Correct: ${correct} - Failed: ${incorrect} - Unanswered: ${unanswered}`}
            </strong>
            <div style={{ marginTop: '16px' }}>
            <Button variant="contained" onClick={() => reset()}>
                Reset
            </Button>
            </div>
        </footer>
    )
}
