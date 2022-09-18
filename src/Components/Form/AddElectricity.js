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
  Fab,
} from '@mui/material';
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
import CheckIcon from '@mui/icons-material/Check';
import { green } from '@mui/material/colors';
import usePushUpload from '../../hooks/usePushUpload';
import useCreateValue from '../../hooks/useCreateValue';

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

export default function AddElectricity({user, open, handleOpen, tag, handleGetData}) {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [valCompany, setValCompany] = React.useState('PLN');
  const [valCustomerId, setValCustomerId] = React.useState('');
  const [valUsage, setValUsage] = React.useState(0);
  const [valStandMeterFrom, setValStandMeterFrom] = React.useState(null);
  const [valStandMeterUntil, setValStandMeterUntil] = React.useState(null);
  const [valCost, setValCost] = React.useState(null);
  const [valPayment, setValPayment] = React.useState('');
  const [valAdminFee, setValAdminFee] = React.useState(null);
  const [valCashback, setValCashback] = React.useState(null);
  const [valBillDate, setValBillDate] = React.useState(dayjs());
  const [valBill, setValBill] = React.useState(0);
  const [imag, setImag] = React.useState("");
  const [dataImage, setDataImage] = React.useState(null);
  const [paymentPhoto, setPaymentPhoto] = React.useState(null);
  const [errCustomerId, setErrCustomerId] = React.useState(false);
  const [errBillDate, setErrBillDate] = React.useState(false);
  const [errStandMeterFrom, setErrStandMeterFrom] = React.useState(false);
  const [errStandMeterUntil, setErrStandMeterUntil] = React.useState(false);
  const [errCost, setErrCost] = React.useState(false);
  const [errAdminFee, setErrAdminFee] = React.useState(false);
  const [errUploadButton, setErrUploadButton] = React.useState(false);
  const [paymentSelected, setPaymentSelected] = React.useState(false);


  const handleChangeValCompany = (data) => {
    setValCompany(data.target.value)
  }
  const handleChangeValCustomerId = (data) => {
    setValCustomerId(data.target.value)
    setErrCustomerId(false)
  }
  const handleChangeValStandMeterFrom = (data) => {
    setValStandMeterFrom(data.value)
    setValUsage(valStandMeterUntil - data.value)
    setErrStandMeterFrom(false)
  }
  const handleChangeValStandMeterUntil = (data) => {
    setValStandMeterUntil(data.value)
    setValUsage(data.value - valStandMeterFrom)
    setErrStandMeterUntil(false)
  }
  const handleChangeValCost = (data) => {
    setValCost(data.value)
    setErrCost(false)
  }
  const handleChangeValAdminFee = (data) => {
    setValAdminFee(data.value)
    setValBill(valCost - data.value)
    setErrAdminFee(false)
  }
  const handleChangeValCashback = (data) => {
    setValCashback(data.value)
  }
  const handlePaymentSelected = (data) => {
    setValPayment(data.target.value)
    setPaymentSelected(true)
  }

  function beforeSumbitChecklist () {
    if(valCustomerId === ''){
      setErrCustomerId(true)
    }
    if(valBillDate === ''){
      enqueueSnackbar(`Please double check, bill date cant be empty`, {variant:"warning"});
      setErrBillDate(true)
    }
    if(valStandMeterFrom === null){
      setErrStandMeterFrom(true)
    }
    if(valStandMeterUntil === null){
      setErrStandMeterUntil(true)
    }
    if(valCost === null){
      setErrCost(true)
    }
    if(valAdminFee === null){
      setErrAdminFee(true)
    }
    if(dataImage === null){
      setErrUploadButton(true)
    }
    if(
      valCustomerId !== '' &&
      valBillDate !== '' &&
      valStandMeterFrom != null &&
      valStandMeterUntil != null &&
      valCost !== null &&
      valAdminFee !== null &&
      errUploadButton !== null
    ){
      handleUpload()
    }
  }

  const userId = JSON.parse(localStorage.getItem('userId'));
  let dateNow = new Date();
  let timeNow = dateNow.toLocaleDateString('id-ID', {day: '2-digit', month: 'long',year: 'numeric'});
  let dateId = valBillDate.$d.toLocaleDateString('id-ID', {month: 'long', year: 'numeric'});

  const HandleGetImage = (event) => {
    // console.log(event.target.files[0])
    setDataImage(event.target.files[0])
    setImag(URL.createObjectURL(event.target.files[0]))
    setErrUploadButton(false)
  }

  //Handle Upload
  const pathUpload = `/Transaction/${tag}/${userId}/${valCustomerId.remarks} (${valCustomerId.idCustomer}) - ${dateId}.jpeg`
  const upload = usePushUpload(pathUpload, dataImage, false)
  const handleUpload = () => {
    if(dataImage !== null){
      upload.getProcessUpload()
    } else {
      handlePostElectric()
    }
  }
  

  //Handle Write Database
  const postElectric = useCreateValue()
  const handlePostElectric = async () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const path = `/transaction/${tag}/${user.uid}`
    if(dataImage !== null){
      const postData = {
        id: valBillDate.$d.getTime(),
        createdAt: timeNow,
        billDate: dateId,
        company: valCompany,
        customerId: valCustomerId.idCustomer,
        unitName: valCustomerId.remarks,
        standMeterFrom: valStandMeterFrom,
        standMeterUntil: valStandMeterUntil,
        usage: valUsage,
        paymentMethod: valPayment,
        paymentStatus: true,
        cost: valCost,
        adminFee: valAdminFee,
        cashback: valCashback,
        bill: valBill,
        paymentPhoto : upload.urlPhoto,
        userName: user.name,
        userId: userId,
      }
      await postElectric.pushValue(path, postData)
      handleClose()
      enqueueSnackbar("Data has been saved", {variant:"info"})
    } else {
      setIsLoading(true)
      setSuccess(true)
      const postData = {
        id: valBillDate.$d.getTime(),
        createdAt: timeNow,
        billDate: dateId,
        company: valCompany,
        customerId: valCustomerId.idCustomer,
        unitName: valCustomerId.remarks,
        standMeterFrom: valStandMeterFrom,
        standMeterUntil: valStandMeterUntil,
        usage: valUsage,
        paymentMethod: valPayment,
        paymentStatus: false,
        cost: valCost,
        adminFee: valAdminFee,
        cashback: valCashback,
        bill: valBill,
        paymentPhoto: '',
        userName: user.name,
        userId: userId,
      }
      await postElectric.pushValue(path, postData)
      setTimeout(() => {
        handleClose()
        enqueueSnackbar("Data has been saved", {variant:"info"})
      }, 2000);
    }
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
    setValBill(null)
    setValBillDate(dayjs())
    setValCompany('PLN')
    setDataImage(null)
    setPaymentPhoto(null)
    setImag('')
    setErrCustomerId(false)
    setErrBillDate(false)
    setErrStandMeterFrom(false)
    setErrStandMeterUntil(false)
    setPaymentSelected(false)
    setErrCost(false)
    setErrAdminFee(false)
    setErrUploadButton(false)
    setIsLoading(false)
    setSuccess(false)
  }

  
  React.useEffect(() => {
    if(upload.urlPhoto){
      handlePostElectric()
    }
  }, [upload.urlPhoto])

  return (
    <div>
      <Dialog
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

                      required
                      error={errCustomerId}
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
              {/* Bill Date  */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'20px'}} key='Bill Date'>
                <Typography flex={1}>Bill Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack flex={2}>
                    <DatePicker
                      required
                      error={errBillDate}
                      views={['year', 'month']}
                      minDate={dayjs('2012-03-01')}
                      maxDate={dayjs('2023-06-01')}
                      value={valBillDate}
                      onChange={(newValue) => {setValBillDate(newValue)}}
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
                      required
                      error={errStandMeterFrom}
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
                      required
                      error={errStandMeterUntil}
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
              {/* Cost */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'20px'}} key='Cost'>
                <Typography flex={1}>Cost</Typography>
                <Stack flex={2}>
                  <NumericFormat
                    required
                    error={errCost}
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
                    required
                    error={errAdminFee}
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
              {/* Method */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'20px'}} key='Method'>
                <Typography flex={1}>Method</Typography>
                <Stack flex={2}>
                  <FormControl fullWidth>
                    <Select
                      required
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
              {/* Proof of payment */}
              {paymentSelected? 
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
                  key='Proof of payment'
                >
                  <Typography flex={1}>Proof of payment *</Typography>
                  <FormControlLabel
                    value="start"
                    control={
                      <Button color={errUploadButton? 'error' : 'primary'} onChange={HandleGetImage} sx={{marginLeft: '15px'}} variant="contained" component="label">
                        Upload
                        <input hidden accept="image/*" multiple type="file" />
                      </Button>
                    }
                    label={dataImage? dataImage.name : null}
                    labelPlacement="start"
                  >
                  </FormControlLabel>
                </Grid>
                :
                null
              }
            </SubGrid>
          </MainGrid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='error'>
            Cancel
          </Button>
          <Button onClick={beforeSumbitChecklist} variant='contained'>
            Save
          </Button>
        </DialogActions>
        {upload.isLoading || isLoading?
          <Backdrop
            sx={{ color: '#fff', zIndex: 1 }}
            open={upload.isLoading || isLoading}
          >
            {upload.success || success? 
              <Fab
                aria-label="save"
                sx={{
                  bgcolor: green[500], 
                  color: '#FFFFFF', 
                  width: '100px', 
                  height: '100px'
                }}
              >
                <CheckIcon sx={{width: '70px', height: '70px'}}/> 
              </Fab>
              : 
              <>
                <Typography fontSize={30}>
                  {upload.progress}
                </Typography>
                <CircularProgress 
                  color="primary" 
                  size={100}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    zIndex: 1,
                  }}
                />
              </>
            }
          </Backdrop>
          :
          null
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