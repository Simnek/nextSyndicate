import React, { useState } from 'react'
import { Box, TextField, Grid, Button, Typography } from '@mui/material'

const EmailForm = () => {

    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')

    const handleOnClick = () => {

        const apiData = {
            subject,
            text
        }
        console.log(apiData);
    }

    return (
        <Box>
            <Typography variant='h3' color={'primary'} mb={5} sx={{ fontWeight: 'bold' }} >
                Posalji email svima
            </Typography>
            <Grid container spacing={2} justifyContent='flex-end'>
                <Grid item xs={12}>
                    <TextField label='Subject' fullWidth value={subject} onChange={e => setSubject(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Email text...' fullWidth value={text} multiline minRows={10} onChange={e => setText(e.target.value)} />
                </Grid>
                <Grid item >
                    <Button variant='contained' onClick={handleOnClick}>
                        Send email
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default EmailForm