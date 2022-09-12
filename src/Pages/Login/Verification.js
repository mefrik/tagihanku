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
import { auth } from '../../Auth/firebase-config';
import { db } from '../../Auth/firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile, sendEmailVerification  } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../Auth/firebase-config';
import { useSnackbar } from 'notistack';
import { collection, getDocs, where } from "firebase/firestore";
import { query } from 'firebase/database';
import Countdown from "react-countdown";
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import bglogin from '../../Assets/Images/bglogin.jpg';


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
    label: 'Biodata Diri',
    description: `Silahkan isi biodata diri anda, pastikan data yang di isi telah sesuai.`,
  },
  {
    label: 'Verifikasi Email',
    description:
      'Klik "Verifikasi Akun", buka email anda dan klik "link" verifikasi akun yang telah dikirim melalui email.',
  },
];

const Input = styled('input')({
  display: 'none',
});



export default function Verfication() {
  const { enqueueSnackbar } = useSnackbar();

  const [activeStep, setActiveStep] = React.useState(0);
  const [dataID, setDataId] = React.useState("");
  const [name, setName] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [noHp, setNoHp] = React.useState("");
  const [imag, setImag] = React.useState("");
  const [dataImage, setDataImage] = React.useState([]);
  const [linkSent, setLinkSent] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [cekName, setCekName] = React.useState(false);
  const [cekNoHp, setCekNoHp] = React.useState(false);
  const navigate = useNavigate();
  
  const handleGetData = () => {
    auth.onAuthStateChanged(async (user) =>{
      if (user !== null) {
        const q = await query(collection(db, "account"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        setDataId(querySnapshot.docs[0].id)
        querySnapshot.forEach((doc) => {
          setNoHp(doc.data().phonenumber)
          setName(doc.data().name)
        })
      }
      setPhoto(user.photoURL)
    });
  }
  const HandleGetImage = (event) => {
    // console.log(event.target.files[0])
    setDataImage(event.target.files[0])
    setImag(URL.createObjectURL(event.target.files[0]))
  }
  const handleUpload = () =>{
    if(photo !== ''){
      return new Promise(resolve => {
          const storageRef = ref(storage,`/Users/${name}/Profile.jpeg`);
          const uploadTask = uploadBytesResumable(storageRef, dataImage);

          uploadTask.on('state_changed', (snapshot) =>{
              const prog = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  setProgress(prog)
              },
              (err) => console.log(err),
              () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                      saveData(url)
                      resolve("Upload Selesai")
                  })
              }
          );
      })
    } else {
      saveData(photo)
    }
  }


  const handleNext = () => {
    if(validator.isEmpty(name) && validator.isEmpty(noHp)){
      setCekName(true)
      setCekNoHp(true)
      enqueueSnackbar("Nama dan Nomor HP tidak boleh kosong", {variant:"warning"});
    }else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // const handleReset = () => {
  //   setActiveStep(0);
  // };
  const handleChangeName = (event) => {
    setName(event.target.value)
  };
  const handleChangeTelephone = (event) => {
    setNoHp(event.target.value)
  };


  const updateData = async () => {
    const database = doc(db, "account", dataID)
    await updateDoc(database, {
      name: name,
      phonenumber : noHp,
    });
  }
  const saveData = async (url) => {
    setLoading(true)
    try {
      updateData()
      await updateProfile(auth.currentUser, {
        displayName: name, photoURL: url,
      }).then(() => {
        // Profile updated!
        enqueueSnackbar("Data akun berhasil di simpan", {variant:"info"});
        handleNext();
      })
    } catch (error) {
      enqueueSnackbar(`Error: ${error}`, {variant:"error"});
    }
  }
  const handleSentVerification = async () => {
    setLinkSent(true);
    console.log(auth.currentUser)
    await sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
        enqueueSnackbar("Email Verifikasi Terkirim", {variant:"info"});
    });
  }

  const handleLoginPage = () => {
    navigate("/")
  }


  React.useEffect(() => {
    handleGetData();
  }, [])
  

  const Renderer = ({ seconds, completed }) => {
    if (completed) {
    // Render a complete state
    return navigate('/')
    }else {
      // Render a countdown
      return (
        <Typography sx={{color: 'blue'}} variant='h6'>
          Pindah otomatis dalam : <span>{seconds}</span>
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
            Verifikasi Akun
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
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 1 ? (
                    <Typography variant="caption">Step Terakhir</Typography>
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
                      <Typography width='150px'>Nama</Typography>
                      <TextField
                        error={cekName}
                        fullWidth
                        required
                        id="name"
                        // label="Required"
                        value={name}
                        variant="standard"
                        hiddenLabel
                        onChange={handleChangeName}
                      />
                    </Grid>
                    <Grid item xs={12} display='flex' alignItems='flex-end' mb='20px'>
                      <Typography width='150px'>No.HP</Typography>
                      <TextField
                        error={cekNoHp}
                        fullWidth
                        required
                        id="phonenumber"
                        // label="Required"
                        value={noHp}
                        variant="standard"
                        hiddenLabel
                        onChange={handleChangeTelephone}
                      />
                    </Grid>
                    <Grid item xs={12} display='flex' alignItems='flex-start' mb='20px'>
                      <Typography width='150px'>Photo</Typography>
                      <Avatar
                        alt="photo profile"
                        src={imag? imag : photo}
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
                          Link verifikasi berhasil dikirim!
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
                          Verifikasi Akun
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
                      onClick={index === steps.length - 1 ? handleUpload : handleNext}
                      disabled={index === steps.length - 1 ? !linkSent : false}
                    >
                      {index === steps.length - 1 ? 'Selesai' : 'Selanjutnya'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Kembali
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>
              Terima kasih sudah melakukan verifikasi akun.
            </Typography>
            <Typography>
              Setelah terverifikasi, silahkan coba login kembali! 
            </Typography>
            <Countdown date={Date.now() + 10000} renderer={Renderer} />
            {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button> */}
          </Paper>
        )}
      </PapperVerification>
    </GridVerification>
  );
}