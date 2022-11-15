import React, { useState } from 'react'
import { Box, TextField, Grid, Button, Typography } from '@mui/material'

const UserForm = () => {

    const [ime, setIme] = useState('')
    const [prezime, setPrezime] = useState('')
    const [brTel, setBrTel] = useState('')
    const [email, setEmail] = useState('')
    const [maticni, setMaticni] = useState('')
    const [radnoMesto, setRadnoMesto] = useState('')
    const [opis, setOpis] = useState('')

    const handleOnClick = () => {

        const apiData = {
            ime,
            prezime,
            brTel,
            email,
            maticni,
            radnoMesto,
            opis
        }
        console.log(apiData);
    }

    return (
        <Box>
            <Typography variant='h3' color={'primary'} mb={5} sx={{ fontWeight: 'bold' }} >
                Nov korisnik
            </Typography>
            <Grid container spacing={2} justifyContent='flex-end'>
                <Grid item xs={12} md={6}>
                    <TextField label='Ime' fullWidth value={ime} onChange={e => setIme(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label='Prezime' fullWidth value={prezime} onChange={e => setPrezime(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label='Broj telefona' fullWidth value={brTel} onChange={e => setBrTel(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label='Email' fullWidth value={email} onChange={e => setEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label='Maticni broj' fullWidth value={maticni} onChange={e => setMaticni(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label='Radno mesto' fullWidth value={radnoMesto} onChange={e => setRadnoMesto(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Opis' fullWidth value={opis} multiline minRows={3} onChange={e => setOpis(e.target.value)} />
                </Grid>
                <Grid item>
                    <Button variant='contained' onClick={handleOnClick}>
                        Dodaj novog korisnika
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default UserForm