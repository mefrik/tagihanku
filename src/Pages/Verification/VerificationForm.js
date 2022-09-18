import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Avatar, Divider, Grid, IconButton, TextField, styled, Fab } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { auth, dbRealtime } from '../../Auth/firebase-config';
import { dbFirestore } from '../../Auth/firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile, sendEmailVerification  } from "firebase/auth";
import { useSnackbar } from 'notistack';
import Countdown from "react-countdown";
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import bglogin from '../../Assets/Images/bglogin.jpg';
import useGetUserLogin from '../../hooks/useGetUserLogin';
import { ref, update } from 'firebase/database';
import UsePushUpload from '../../hooks/usePushUpload';


const GridVerification = styled(Grid)(() => ({
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${bglogin})`,
}))

const PapperVerification = styled(Paper)(() => ({
    padding: '20px',
    background: "rgb(255,255,255,0.7)",
    maxWidth: "500px",
}))

const GridTitle = styled(Grid)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
}))


const steps = [
  {
    label: 'Personal Data',
    description: `Please fill in your personal data, make sure the data that is filled in is appropriate.`,
  },
  {
    label: 'Verification Email',
    description:
      'Click "Account Verification", open your email and click the "link" to verify the account that has been sent via email.',
  },
];

const Input = styled('input')({
  display: 'none',
});



export default function VerificationForm() {
  const { enqueueSnackbar } = useSnackbar()
  const user = useGetUserLogin()
  console.log(user)
  const path = `users/${user.uid}/profile.jpeg`
  const updates = {}

  const [activeStep, setActiveStep] = React.useState(0);
  const [name, setName] = React.useState( '');
  const [noHp, setNoHp] = React.useState( '');
  const [imag, setImag] = React.useState( '');
  const [dataImage, setDataImage] = React.useState(null);
  const [linkSent, setLinkSent] = React.useState(false);
  const [cekName, setCekName] = React.useState(false);
  const [cekNoHp, setCekNoHp] = React.useState(false);
  const navigate = useNavigate();

  
  const handleLoginPage = () => {
    navigate("/")
  }

  
  const handleChangeName = (event) => {
    setCekName(false)
    setName(event.target.value)
  };
  const handleChangeTelephone = (event) => {
    setCekNoHp(false)
    setNoHp(event.target.value)
  };


  const handleNext = () => {
    if(validator.isEmpty(name || user.name) && validator.isEmpty(noHp || user.phoneNumber) && validator.isEmpty(imag || user.photo))
    {
      setCekName(true)
      setCekNoHp(true)
      enqueueSnackbar("Name, Phone and Photo can't be empty", {variant:"warning"});
    }else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  

  const HandleGetImage = (event) => {
    setDataImage(event.target.files[0])
    setImag(URL.createObjectURL(event.target.files[0]))
  }

  //Process to upload
  const upload = UsePushUpload(path, dataImage, false)

  

  const updateData = () => {
    const updateDatas = {
      uid: user.uid,
      email: user.email,
      name: user.name? user.name : name,
      phoneNumber: user.phoneNumber? user.phoneNumber : noHp,
      photoURL: user.photo? user.photo : upload.urlPhoto,
      userStatus: 0,
      userActive: true,
    }
    try{
      updates[`/users/${user.uid}`] = updateDatas;
      update(ref(dbRealtime), updates)
    } catch (updateError) {
      enqueueSnackbar(`Update data error: ${updateError}`, {variant:"error"});
    }
  }
  
  const handleSentVerification = async () => {
    upload.getProcessUpload()
    setLinkSent(true);
    await sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      handleNext()
      enqueueSnackbar("Verification email sent", {variant:"info"});
    });
  }

  

  const Renderer = ({ seconds, completed }) => {
    if (completed) {
    // Render a complete state
    return navigate('/')
    }else {
      // Update data & Render a countdown
      updateData()
      return (
        <Typography sx={{color: 'blue'}} variant='h6'>
          Auto redirect in : <span>{seconds}</span>
        </Typography>
      )
    }
  };
  

  return (
    <GridVerification 
      item xs={12}
      container
    >
      <PapperVerification>
        <GridTitle>
          <Typography 
            component='p' 
            variant='h4'
            mb={2}
            mt={2}
          >
            Verification Account
          </Typography>
          <Button
            variant="text"
            sx={{height: "40px"}}
            onClick={handleLoginPage}
          >
            {"Login Page"}
          </Button>
        </GridTitle>
        <Divider/>
        {user.userStatus !== 0?
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 1 ? (
                      <Typography variant="caption">Last Step</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  {index === 0?
                    <>
                      <Typography>{step.description}</Typography>
                      <Grid item xs={12} display='flex' alignItems='flex-end' mb='20px'>
                        <Typography width='150px'>Name</Typography>
                        <TextField
                          error={cekName}
                          fullWidth
                          required
                          id="name"
                          // label="Required"
                          value={user.name? user.name : name}
                          variant="standard"
                          hiddenLabel
                          onChange={handleChangeName}
                        />
                      </Grid>
                      <Grid item xs={12} display='flex' alignItems='flex-end' mb='20px'>
                        <Typography width='150px'>Phone</Typography>
                        <TextField
                          error={cekNoHp}
                          fullWidth
                          required
                          id="phonenumber"
                          // label="Required"
                          value={user.phoneNumber? user.phoneNumber : noHp}
                          variant="standard"
                          hiddenLabel
                          onChange={handleChangeTelephone}
                        />
                      </Grid>
                      <Grid item xs={12} display='flex' alignItems='flex-start' mb='20px'>
                        <Typography width='150px'>Photo</Typography>
                        <Avatar
                          alt="photo profile"
                          src={user.photo? user.photo : imag}
                          variant="rounded"
                          sx={{width: "200px", height: '200px', objectFit: 'cover', ml: '-40px'}}
                        />
                        <label htmlFor="icon-button-file" onChange={HandleGetImage}>
                          <Input accept="image/*" id="icon-button-file" type="file" />
                          <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                          </IconButton>
                        </label>
                      </Grid>
                    </>
                    :
                    <>
                      <Grid item xs={12} mb='20px'>
                        <Typography>{step.description}</Typography>
                        {linkSent ?
                          <Fab 
                            variant="extended" 
                            size="small" 
                            color="success" 
                            aria-label="add"
                            sx={{p:'20px', mt:'10px'}}
                          >
                            Link verification has been sent
                          </Fab>
                          :
                          <Fab 
                            variant="extended" 
                            size="small" 
                            color="warning" 
                            aria-label="add"
                            onClick={handleSentVerification}
                            sx={{p:'20px', mt:'10px'}}
                          >
                            Send verification
                          </Fab>
                        }
                        
                      </Grid>
                    </>
                  }
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        sx={{ mt: 1, mr: 1 }}
                        onClick={index === steps.length - 1 ? handleNext : handleNext}
                        disabled={index === steps.length - 1 ? !linkSent : false}
                      >
                        {index === steps.length - 1 ? 'All Done' : 'Next'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          :
          <Typography>
            Check your email, maybe on spam
          </Typography>
        }
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>
              Thank you for registering
            </Typography>
            <Typography>
              Afther your account verified, please try to login.
            </Typography>
            <Countdown date={Date.now() + 4000} renderer={Renderer} />
            {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button> */}
          </Paper>
        )}
      </PapperVerification>
    </GridVerification>
  );
}