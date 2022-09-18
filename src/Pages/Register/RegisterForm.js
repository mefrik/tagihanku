import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { signin, signup } from '../../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import validator from 'validator';
import LoadingButton from '@mui/lab/LoadingButton';
import { auth, dbRealtime } from '../../Auth/firebase-config';
import { CardMedia, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, styled, Typography } from '@mui/material';
import bglogin from '../../Assets/Images/bglogin.jpg';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../../Assets/Images/logo.png';
import { ref, set } from 'firebase/database';
import useCreateValue from '../../hooks/useCreateValue';

const GridForm = styled(Grid)(() => ({
    height: "100vh",
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundImage: `url(${bglogin})`
}))

const BoxForm = styled(Box)(() => ({
    width: '50vh', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    height: 'auto',
    background: "rgb(255,255,255,0.1)",
    padding: "20px",
    // boxShadow: "0px 3px 10px 0px rgb(0,0,0,0.2)",
    borderRadius: "5px"
}))


export default function RegisterForm() {
    const createUser = useCreateValue()
    
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [email, setEmail] = useState('');
    const [cekEmail, setCekEmail] = useState(false);
    const [cekPass, setCekPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState ('');
    const [showPassword, setShowPassword] = useState(false);


    const handleEmailChange = (event) => {
        if(validator.isEmail(event.target.value)){
            setCekEmail(false)
        }else if(validator.isEmpty(event.target.value)){
            setCekEmail(false)
        }else {
            setCekEmail(true)
        }
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const HandleSubmit = async (event) => {
        // Checking is password empty
        if(email === '' && password === ''){
            setCekEmail(true)
            setCekPass(true)
            enqueueSnackbar("Email and password cant be empty", {variant:"info"});
        }else if(password === ''){
            setCekPass(true)
            enqueueSnackbar("Password cant be empty", {variant:"warning"});
        }
        else {
            setLoading(true)
            setCekPass(false)
            try{
                await signup(email, password).then( async (snapshot) => {
                    const path = `/users/${snapshot.user.uid}`
                    const value = {
                        email: snapshot.user.email,
                        uid: snapshot.user.uid,
                        createdAt: Date.now(), 
                    }
                    await createUser.setValue(path, value)
                })
                navigate('/verification')
                enqueueSnackbar("Register Success", {variant:"success"})
                setLoading(false)
            } catch {
                enqueueSnackbar("Please check your input", {variant:"warning"});
                setLoading(false)
            }
        }
    };

    return (
        <GridForm item container >
            <CssBaseline />
            <Stack sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                <CardMedia
                    component="img"
                    image={logo}
                    height='50%'
                    width='auto'
                />
                <Typography
                    sx={{
                        fontSize: '60px',
                        color: 'white',
                    }}
                >
                    agihanku
                </Typography>
            </Stack>
            <BoxForm>
                <FormControl variant="outlined" sx={{mb: 2}}>
                    <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                    <OutlinedInput
                        id="email"
                        required
                        type={'email'}
                        value={email}
                        onChange={handleEmailChange}
                        label='email'
                        error={cekEmail}
                        autoFocus
                        fullWidth
                    />
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label='pssword'
                        error={cekPass}
                        autoFocus
                        fullWidth
                    />
                </FormControl>
                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color='primary'
                    sx={{ mt: 3, mb: 2 }}
                    loading={loading}
                    onClick={HandleSubmit}
                >
                    Register
                </LoadingButton>
            </BoxForm>
        </GridForm>
    )
}
