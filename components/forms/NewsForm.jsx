import React, { useState } from 'react'
import { Box, TextField, Grid, Button, Typography } from '@mui/material'

const NewsForm = () => {

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
                Nova vest
            </Typography>
            <Grid container spacing={2} justifyContent='flex-end'>
                <Grid item xs={12}>
                    <TextField label='Nova vest' fullWidth value={text} multiline minRows={10} onChange={e => setText(e.target.value)} />
                </Grid>
                <Grid item>
                    <Button variant='contained' onClick={handleOnClick}>
                        Dodaj vest
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default NewsForm