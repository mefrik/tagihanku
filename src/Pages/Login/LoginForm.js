import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signin } from '../../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import validator from 'validator';
import LoadingButton from '@mui/lab/LoadingButton';
import { auth } from '../../Auth/firebase-config';
import { styled } from '@mui/material';
import bglogin from '../../Assets/Images/bglogin.jpg';


const theme = createTheme();

const GridForm = styled(Grid)(() => ({
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${bglogin})`
}))

const BoxForm = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    height: 'auto',
    background: "rgb(255,255,255,0.7)",
    padding: "20px",
    boxShadow: "0px 3px 10px 0px rgb(0,0,0,0.2)",
    borderRadius: "5px"
}))


export default function LoginForm() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [cekEmail, setCekEmail] = useState(false);
    const [cekPass, setCekPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        navigate('/register')
    }
    const handleEmailChange = (event) => {
        if(validator.isEmail(event.target.value)){
            setCekEmail(false)
        }else if(validator.isEmpty(event.target.value)){
            setCekEmail(false)
        }else {
            setCekEmail(true)
        }
    }

    const HandleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        // Checking is password empty
        if(validator.isEmpty(data.get('email')) && validator.isEmpty(data.get('password'))){
            setCekEmail(true)
            setCekPass(true)
            enqueueSnackbar("Email and password cant be empty", {variant:"info"});
        }else if(validator.isEmpty(data.get('password'))){
            setCekPass(true)
            enqueueSnackbar("Password cant be empty", {variant:"warning"});
        }
        else {
            setLoading(true)
            setCekPass(false)
            try{
                await signin(data.get('email'), data.get('password'))
                await auth.onAuthStateChanged((user) => {
                    if(user.emailVerified){
                        navigate('/dashboard/analytics')
                        enqueueSnackbar("Login Success", {variant:"success"});
                    }else {
                        navigate('/verification')
                        enqueueSnackbar("Need verified account", {variant:"info"});
                    }
                });
            } catch {
                enqueueSnackbar("Your email or password not registered", {variant:"error"});
                setLoading(false)
            }
        }

        
    };

    return (
        <GridForm item container >
            <CssBaseline />
            <BoxForm>
                <Typography variant="h4">
                    Tagihanku   
                </Typography>
                <Box 
                    component="form" 
                    noValidate 
                    onSubmit={HandleSubmit} 
                    sx={{ mt: 1 }}
                >
                    <TextField
                        error={cekEmail}
                        // helperText={cekEmail? 'Please check your email' : ''}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        // onChange={handleEmailChange}
                    />
                    <TextField
                        error={cekPass}
                        // helperText={cekPass? 'Password cant empty' : ""}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <LoadingButton
                        // disabled={!verified}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color='primary'
                        // loadingPosition="end"
                        sx={{ mt: 3, mb: 2 }}
                        loading={loading}
                    >
                        Login
                    </LoadingButton>
                </Box>
            </BoxForm>
        </GridForm>
    )
}
