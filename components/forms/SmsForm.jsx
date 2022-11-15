import React, { useState } from 'react'
import { Box, TextField, Grid, Button, Typography } from '@mui/material'

const SmsForm = () => {

    const [text, setText] = useState('')

    const handleOnClick = () => {

        const apiData = {
            text
        }
        console.log(apiData);
    }

    return (
        <Box>
            <Typography variant='h3' color={'primary'} mb={5} sx={{ fontWeight: 'bold' }} >
                Posalji sms svima
            </Typography>
            <Grid container spacing={2} justifyContent='flex-end'>
                <Grid item xs={12}>
                    <TextField label='Sms text...' fullWidth value={text} multiline minRows={5} onChange={e => setText(e.target.value)} />
                </Grid>
                <Grid item>
                    <Button variant='contained' onClick={handleOnClick}>
                        Send sms
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SmsForm