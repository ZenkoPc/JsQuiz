import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useQuestionsStore } from "../store/questions";
import { useQuestionQuantity } from "../store/quantity";

export function Start() {
    const fetchQuestions = useQuestionsStore(store => store.fetchQuestions)
    const { questions, setQuantity } = useQuestionQuantity()

    const handleChange = (e: SelectChangeEvent) => {
        const value = parseInt(e.target.value)
        setQuantity(value)
    }

    const handleClick = () => {
        fetchQuestions(questions)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap:'10px', marginTop: '20px' }}>
            <FormControl sx={{ width: '100px' }}>
                <InputLabel id='quantity'># preguntas:</InputLabel>
                <Select
                    labelId="quantity"
                    id="questionQuantity"
                    label='5'
                    value={questions.toString()}
                    onChange={handleChange}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={handleClick} variant="contained">
                ¡Empezar!
            </Button>
        </div>
    )
}