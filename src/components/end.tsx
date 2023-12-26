import { Box, BoxProps, Button, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useQuestionsStore } from '../store/questions'
import { useQuestionsData } from '../hooks/useQuestionsData'
import { ExcelentIcon } from '../JSlogo/excelent'
import { AprovedIcon } from '../JSlogo/aproved'
import { FailedIcon } from '../JSlogo/failed'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderColor: 'primary.main'
}

function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          p: 1,
          m: 1,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
  }

const calculatePercentage = (total: number, correct: number) => {
    if(total === correct){
        return 'Perfecto'
    }

    const percentageToAprove = total * 0.6

    if(correct >= percentageToAprove) return 'Aprovado'
    else return 'Fallo'
    
}

export const EndGame = () => {
    const reset = useQuestionsStore(store => store.reset)
    const { correct, incorrect } = useQuestionsData()
    const quantity = useQuestionsStore(store => store.quantity)

    const handleClose = () => {
        reset()
    }

    const data = calculatePercentage(quantity, correct)

    return (
        <>
            <Modal
                open={true}
                onClose={handleClose}
            >
                 <Box sx={style}>
                    <Typography variant="h6" component="h2">
                    Resultado: {data}
                    </Typography>
                    <div 
                        style={{ 
                            display: 'grid', 
                            gridTemplateColumns: '2fr 1fr',
                            gap: '10px'
                    }}>
                        <div>
                            <Item>Preguntas Correctas: {correct}</Item>
                            <Item>Preguntas Incorrectas: {incorrect}</Item>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {data === 'Perfecto' && <ExcelentIcon />}
                            {data === 'Aprovado' && <AprovedIcon />}
                            {data === 'Fallo' && <FailedIcon />}
                        </div>
                        <Button variant='contained' onClick={handleClose}>
                            Volver a comenzar
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}