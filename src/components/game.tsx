import { Card, IconButton, LinearProgress, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { useQuestionsStore } from "../store/questions"
import { type Question as QuestionType } from "../types"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import { Footer } from "./footer"
import { EndGame } from "./end"

const getBackgroundColor = (info: QuestionType, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info

    //no selected anything
    if(userSelectedAnswer == null) return 'transparent'
    //selected
    if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    //correct
    if(index === correctAnswer) return 'green'
    //failed
    if(index === userSelectedAnswer) return 'red'

    return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const handleAnswer = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }
    console.log(info)

    return (
        <Card variant='outlined' sx={{ p: 2, bgcolor: '#222', textAlign: 'left', marginTop: 4 }}>
            <Typography variant='h5'>
                {info.question}
            </Typography>
            <SyntaxHighlighter language='javascript' style={gradientDark}>
                {info.code}
            </SyntaxHighlighter>
            <List sx={{ bgcolor: '#333' }} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton 
                            disabled={info.userSelectedAnswer != null}
                            onClick={handleAnswer(index)}
                            sx={{ backgroundColor: getBackgroundColor(info, index) }}
                        >
                            <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export const Game = () => {
    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const questionInfo = questions[currentQuestion]    
    const goNextQuestion = useQuestionsStore(store => store.goNextQuestion)
    const goPreviousQuestion = useQuestionsStore(store => store.goPreviousQuestion)
    const testProgress = useQuestionsStore(store => store.progress)

    return (
        <>
            <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
                <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
                    <ArrowBackIosNew />
                </IconButton>
                {currentQuestion + 1} / {questions.length}
                <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
                    <ArrowForwardIos />
                </IconButton>
            </Stack>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <LinearProgress style={{ width: '90%', height: '7px' }} variant="determinate" value={testProgress}/>
                <strong>{testProgress}%</strong>
            </div>
            <Question info={questionInfo} />
            <Footer />

            {testProgress === 100 && <EndGame />}

        </>
    )
}