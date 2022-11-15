import React, { useState } from 'react'
import { Box, TextField, Grid, Button, Typography } from '@mui/material'

const ChangePasswordForm = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPassword2, setNewPassword2] = useState('')


    const handleOnClick = () => {

        const apiData = {
            oldPassword,
            newPassword
        }
        console.log(apiData);
    }

    return (
        <Box>
            <Typography variant='h3' color={'primary'} mb={5} sx={{ fontWeight: 'bold' }} >
                Change password
            </Typography>
            <Grid container spacing={2} justifyContent='flex-end'>
                <Grid item xs={12}>
                    <TextField label='Old password' type='password' value={oldPassword} fullWidth onChange={e => setOldPassword(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='New password' type='password' value={newPassword} fullWidth onChange={e => setNewPassword(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='New password again' type='password' value={newPassword2} fullWidth onChange={e => setNewPassword2(e.target.value)} />
                </Grid>
                <Grid item>
                    <Button variant='contained' onClick={handleOnClick}>
                        Change password
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ChangePasswordForm