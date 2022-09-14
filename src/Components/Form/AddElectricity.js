import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { 
  Grid, 
  Typography, 
  TextField, 
  Divider, 
  FormControl, 
  RadioGroup, 
  Radio, 
  FormControlLabel, 
  Backdrop,
  CircularProgress,
  Stack,
  OutlinedInput,
  InputAdornment,
  styled,
  Select,
  MenuItem,
} from '@mui/material';
import { ref as refStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useSnackbar } from 'notistack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { NumericFormat } from 'react-number-format';
import tokopediaLogos from '../../Assets/Images/tokopedia.png';
import gopayLogos from '../../Assets/Images/gopay.png';
import ovoLogos from '../../Assets/Images/ovo.png';
import danaLogos from '../../Assets/Images/dana.png';
import { storage } from '../../Auth/firebase-config';
import { getDatabase, ref as dbref, set } from 'firebase/database';

const MainGrid = styled(Grid)(() => ({
  display: 'flex',
}))
const SubGrid = styled(Grid)(() => ({
  paddingRight: '10px',
  paddingLeft: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}))
const SubTitle = styled(Typography)(() => ({
  fontSize: '20px',
  fontWeight: 400,
  marginBottom: '20px',
  color: '#9C9EFE',
  borderRadius: '10px',
  boxSizing: 'border-box'
}))

const PayMentItem = styled(MenuItem)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

export default function AddElectricity({open, handleOpen, tag, handleGetData}) {
  const { enqueueSnackbar } = useSnackbar();
  const [valCompany, setValCompany] = React.useState('PLN');
  const [valCustomerId, setValCustomerId] = React.useState('');
  const [valUsage, setValUsage] = React.useState(0);
  const [valStandMeterFrom, setValStandMeterFrom] = React.useState(null);
  const [valStandMeterUntil, setValStandMeterUntil] = React.useState(null);
  const [valCost, setValCost] = React.useState(null);
  const [valPayment, setValPayment] = React.useState('');
  const [valAdminFee, setValAdminFee] = React.useState(null);
  const [valCashback, setValCashback] = React.useState(null);
  const [valDate, setValDate] = React.useState(null);
  const [valBill, setValBill] = React.useState(0);
  const [loading,setLoading] = React.useState(false);
  const [userId,  setUserId] = React.useState("");
  const [proofOfPayment, setProofOfPayment] = React.useState(false);
  const [paymentStatus, setPaymentStatus] = React.useState([]);
  const [imag, setImag] = React.useState("");
  const [dataImage, setDataImage] = React.useState([]);
  const [photo, setPhoto] = React.useState("");

  let dateNow = new Date();
  let dateMonth = dateNow.getMonth();
  let dateYear = dateNow.getFullYear();
  let timeNow = dateNow.getTime();

  const handleChangeValCompany = (data) => {
    setValCompany(data.target.value)
  }
  const handleChangeValCustomerId = (data) => {
    setValCustomerId(data.target.value)
  }
  const handleChangeValStandMeterFrom = (data) => {
    setValStandMeterFrom(data.value)
  }
  const handleChangeValStandMeterUntil = (data) => {
    setValStandMeterUntil(data.value)
    setValUsage(data.value - valStandMeterFrom)
  }
  const handleChangeValCost = (data) => {
    setValCost(data.value)
  }
  const handleChangeValAdminFee = (data) => {
    setValAdminFee(data.value)
    setValBill(valCost - data.value)
  }
  const handleChangeValCashback = (data) => {
    setValCashback(data.value)
  }
  const handlePaymentSelected = (data) => {
    setValPayment(data.target.value)
  }
  const handleProofOfPayment = (data) => {
    setProofOfPayment(data.target.value)
  }

  const HandleGetImage = (event) => {
    // console.log(event.target.files[0])
    setDataImage(event.target.files[0])
    setImag(URL.createObjectURL(event.target.files[0]))
  }
  const handleUpload = () =>{
    return new Promise(resolve => {
        const storageRef = refStorage(storage,`/Transaction/${tag}/${valCustomerId.remarks} (${valCustomerId.idCustomer}) - ${dateMonth}${dateYear}.jpeg`);
        const uploadTask = uploadBytesResumable(storageRef, dataImage);

        uploadTask.on('state_changed', (snapshot) =>{
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // setProgress(prog)
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setPhoto(url)
                    console.log(url)
                    resolve("Upload Selesai")
                })
            }
        );
    })
  }

  async function handleSubmit() {
    await handleUpload().then(() => {
      let dateId = valDate.$d.getTime();
      const db = getDatabase();
      return new Promise(resolve => {
        set(dbref(db, `/transaction/${tag}/${timeNow}`), {
          id: userId,
          createdAt: timeNow,
          date: dateId,
          company: valCompany,
          customerId: valCustomerId.idCustomer,
          customerName: valCustomerId.remarks,
          standMater: {
            from: valStandMeterFrom,
            until: valStandMeterUntil,
          },
          usage: valUsage,
          paymentMethod: valPayment,
          cost: valCost,
          adminFee: valAdminFee,
          cashback: valCashback,
          bill: valBill,
          paymentPhoto : photo,
        }).then(() => {
          enqueueSnackbar("Data berhasil ditambahkan", {variant:"info"});
          handleClose()
          resolve('Database sukses ditambahkan')
        }).catch((error) => {
          enqueueSnackbar(`Terjadi Error : ${error}`, {variant:"info"});
        })
      })
    })
  }

    
  const handleClose = () => {
    handleOpen()
    handleReset()
    handleGetData()
  };


  //Reset Value
  const handleReset = () => {
    setValCustomerId('')
    setValUsage(0)
    setValStandMeterFrom(null)
    setValStandMeterUntil(null)
    setValCost(null)
    setValPayment('')
    setValAdminFee(null)
    setValCashback(null)
    setValDate(dayjs())
    setValBill(null)
  }


  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Add Electricity Bill
        </DialogTitle>
        <Divider/>
        <DialogContent>
          <MainGrid item xs={12} container>
            <SubGrid item xs={5}>
              <SubTitle>Detail</SubTitle>
              {/* COMPANY */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'20px'}} key='Company'>
                <Typography flex={1}>Company</Typography>
                <FormControl flex={0}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="PLN"
                    name="radio-buttons-group"
                    value={valCompany}
                    onChange={handleChangeValCompany}
                  >
                    <FormControlLabel value="PLN" control={<Radio />} label="PLN" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/* Customer ID */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'20px'}} key='Customer ID'>
                <Typography flex={1}>Customer ID</Typography>
                <Stack flex={2}>
                  <FormControl fullWidth>
                    <Select
                      value={valCustomerId}
                      onChange={handleChangeValCustomerId}
                    >
                      {
                        customerId.map((data) => (
                          <PayMentItem 
                            key={data.id}
                            value={data}
                          >
                            {data.remarks}
                          </PayMentItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
              {/* Date */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'20px'}} key='Date'>
                <Typography flex={1}>Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack flex={2}>
                    <DatePicker
                      views={['year', 'month']}
                      minDate={dayjs('2012-03-01')}
                      maxDate={dayjs('2023-06-01')}
                      value={valDate}
                      onChange={(newValue) => {setValDate(newValue)}}
                      renderInput={(params) => <TextField {...params} helperText={null} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              {/* Stand Meter */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'20px'}} key='Stand Meter'>
                <Typography flex={1}>Stand Meter</Typography>
                <Stack flex={2} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  {/* FROM */}
                  <Stack>
                    <NumericFormat
                      value={valStandMeterFrom}
                      customInput={TextField}
                      onValueChange={(values) => {handleChangeValStandMeterFrom(values)}}
                      renderText={(value) => <b>{value}</b>}
                      label='From'
                    />
                  </Stack>
                  <Typography flex={1} ml={1} mr={1}>to</Typography>
                  {/* UNTIL */}
                  <Stack>
                    <NumericFormat
                      value={valStandMeterUntil}
                      customInput={TextField}
                      onValueChange={(value) => {handleChangeValStandMeterUntil(value)}}
                      renderText={(value) => <b>{value}</b>}
                      label='Until'
                    />
                  </Stack>
                </Stack>
              </Grid>
              {/* Usage */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'20px'}} key='Usage'>
                <Typography flex={1}>Usage</Typography>
                <Stack flex={2}>
                  <OutlinedInput
                    disabled
                    sx={{
                      bgcolor: 'rgb(0,0,0,0.1)',
                      fontWeight: 'bolder',
                    }}
                    endAdornment={<InputAdornment position="end">kW.h</InputAdornment>}
                    type='number'
                    value={valUsage}
                    // onChange={handleChange('weight')}
                  />
                </Stack>
              </Grid>
            </SubGrid>
            <Divider orientation="vertical" flexItem/>
            <SubGrid item xs>
              <SubTitle>Payment</SubTitle>
              {/* Method */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'20px'}} key='Method'>
                <Typography flex={1}>Method</Typography>
                <Stack flex={2}>
                  <FormControl fullWidth>
                    <Select
                      id="demo-simple-select"
                      value={valPayment}
                      onChange={handlePaymentSelected}
                    >
                      {
                        paymentList.map((data) => (
                          <PayMentItem 
                            key={data.id}
                            value={data.name}
                          >
                            <img  
                              src={data.logo}
                              height='40px'
                              width='auto'
                            />
                          </PayMentItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
              {/* Cost */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'20px'}} key='Cost'>
                <Typography flex={1}>Cost</Typography>
                <Stack flex={2}>
                  <NumericFormat
                    customInput={TextField}
                    prefix={'Rp. '}
                    thousandsGroupStyle="thousand"
                    thousandSeparator=","
                    onValueChange={(value) => handleChangeValCost(value)}
                    renderText={(value) => <b>{value}</b>}
                  />
                </Stack>
              </Grid>
              {/* Admin Fee */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'20px'}} key='Admin Fee'>
                <Typography flex={1}>Admin Fee</Typography>
                <Stack flex={2}>
                  <NumericFormat
                    customInput={TextField}
                    prefix={'Rp. '}
                    thousandsGroupStyle="thousand"
                    thousandSeparator=","
                    onValueChange={(value) => {handleChangeValAdminFee(value)}}
                    renderText={(value) => <b>{value}</b>}
                  />
                </Stack>
              </Grid>
              {/* Cashback */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'20px'}} key='Cashback'>
                <Typography flex={1}>Cashback</Typography>
                <Stack flex={2}>
                  <NumericFormat
                    customInput={TextField}
                    prefix={'Rp. '}
                    thousandsGroupStyle="thousand"
                    thousandSeparator=","
                    onValueChange={(value) => {handleChangeValCashback(value)}}
                    renderText={(value) => <b>{value}</b>}
                  />
                </Stack>
              </Grid>
              {/* Bill */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'20px'}} key='Bill'>
                <Typography flex={1}>Bill</Typography>
                <Stack flex={2}>
                  <NumericFormat
                    disabled
                    sx={{
                      bgcolor: 'rgb(0,0,0,0.1)',
                      fontWeight: 'bolder',
                    }}
                    customInput={TextField}
                    prefix={'Rp. '}
                    value={valBill}
                    thousandsGroupStyle="thousand"
                    thousandSeparator=","
                  />
                </Stack>
              </Grid>
              {/* Proof of payment */}
              <Grid 
                sx={{
                  display: 'flex', 
                  alignItems: 'center', 
                  mb:'20px', 
                  bgcolor: '#9C9EFE', 
                  color: 'white', 
                  paddingLeft: '10px', 
                  paddingRight: '20px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  borderRadius: '5px',
                  // border: '2px dashed white',
                }} 
                key='Status'
              >
                <Typography flex={1}>Proof of payment</Typography>
                <FormControlLabel
                  value="start"
                  control={
                    <Button onChange={HandleGetImage} sx={{marginLeft: '15px'}} variant="contained" component="label">
                      Upload
                      <input hidden accept="image/*" multiple type="file" />
                    </Button>
                  }
                  label={dataImage? dataImage.name : ""}
                  labelPlacement="start"
                >
                </FormControlLabel>
              </Grid>
            </SubGrid>
          </MainGrid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='error'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant='contained'>
            Save
          </Button>
        </DialogActions>
        {loading? 
          <Backdrop
            sx={{ color: '#fff', zIndex: 1 }}
            open={loading}
          >
            <CircularProgress color="inherit"/>
          </Backdrop>
          :
          ""
        }
      </Dialog>
    </div>
  );
}

const paymentList = [
  {
    id: 1,
    name: 'Tokopedia',
    link: 'www.tokopedia.com',
    logo: tokopediaLogos
  },
  {
    id: 2,
    name: 'Gopay',
    link: 'www.gopay.co.id',
    logo: gopayLogos
  },
  {
    id: 3,
    name: 'OVO',
    link: 'www.ovo.id',
    logo: ovoLogos
  },
  {
    id: 4,
    name: 'DANA',
    link: 'www.dana.id',
    logo: danaLogos
  },
]

const customerId = [
  {
    id: 1,
    type: 'PLN',
    idCustomer: 522011242871,
    remarks: 'Griya Satria',
  },
  {
    id: 2,
    type: 'PLN',
    idCustomer: 522011082240,
    remarks: 'Gatot Subroto',
  },
]