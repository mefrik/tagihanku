import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { 
  Grid, 
  Typography, 
  Divider, 
  FormControlLabel, 
  Backdrop,
  CircularProgress,
  Stack,
  styled,
  CardMedia,
  Skeleton,
  Fab,
  IconButton,
  FormControl,
  MenuItem,
  Select,
  Chip,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import tokopediaLogos from '../../Assets/Images/tokopedia.png';
import gopayLogos from '../../Assets/Images/gopay.png';
import ovoLogos from '../../Assets/Images/ovo.png';
import danaLogos from '../../Assets/Images/dana.png';
import { getDatabase, ref, update } from 'firebase/database';
import { ref as refStorage, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { storage } from '../../Auth/firebase-config';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneIcon from '@mui/icons-material/Done';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ModalImages from '../Modal/ModalImages';
import { useSnackbar } from 'notistack';
import usePushUpload from '../../hooks/usePushUpload';
import useUpadateValue from '../../hooks/useUpdateValue';
import useDeleteValue from '../../hooks/useDeleteValue';

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
  color: '#9C9EFE',
  borderRadius: '10px',
  boxSizing: 'border-box'
}))
const PayMentItem = styled(MenuItem)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

export default function DetailElectric({tag, openDetail, handleCloseDetail, detailData, handleGetData, skelton}) {
  const { enqueueSnackbar } = useSnackbar();
  const [progress, setProgress] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [processDelete, setProcessDelete] = React.useState(false);
  const [dataImage, setDataImage] = React.useState(null);
  const [imag, setImag] = React.useState("");
  const [cekImage, setCekImage] = React.useState(false);
  const [paymentMethodLogo, setPaymentMethodLogo] = React.useState('');
  const [visible, setVisible] = React.useState('');
  const [hoverImage, setHoverImage] = React.useState(false);
  const [deleteInfo, setDeleteInfo] = React.useState('');
  const [valPayment, setValPayment] = React.useState('');
  const [paymentSelected, setPaymentSelected] = React.useState(false);
  const [errUploadButton, setErrUploadButton] = React.useState(false);
  const [errPaymentMethod, setErrPaymentMethod] = React.useState(false);
  const [openModalImages, setOpenModalImages] = React.useState(false);
  
  function handleModalImages () {
    setOpenModalImages(!openModalImages)
  }

  const handleHoverImage = () => {
    setHoverImage(!hoverImage)
  }

  function beforeSumbitChecklist () {
    if(valPayment === ''){
      setErrPaymentMethod(true)
    }
    if(valPayment !== '' && !cekImage){
      setErrUploadButton(true)
    }
    if(cekImage && valPayment !== ''){
      handleUpload()
    }
  }

  const handlePaymentSelected = (data) => {
    setValPayment(data.target.value)
    setPaymentSelected(true)
    setErrPaymentMethod(false)
  }
  
  const handleGetImage = (event) => {
    setDataImage(event.target.files[0])
    setImag(URL.createObjectURL(event.target.files[0]))
    setCekImage(true)
    setErrUploadButton(false)
  }


  //Handle Upload
  const pathUpload = `/Transaction/${tag}/${detailData.userId}/${detailData.unitName} (${detailData.customerId}) - ${detailData.billDate}.jpeg`
  const upload = usePushUpload(pathUpload, dataImage, false)
  const handleUpload = () => {
    if(dataImage !== null){
      upload.getProcessUpload()
    }
  }

  //Handle Update Database
  const updateElectric = useUpadateValue()
  const handleUpdate = async () => {
    const pathUpdate = `/transaction/${tag}/${detailData.userId}/${detailData.key}/`
    setIsLoading(true)
    setSuccess(true)
    const updates = {
      paymentStatus : true,
      paymentMethod : valPayment,
      paymentPhoto : upload.urlPhoto,
    }
    await updateElectric.updateField(pathUpdate, updates)
    handleClose()
    enqueueSnackbar("Data has been saved", {variant:"info"})
  }
  

  //Handle Delete Storage
  const pathStorage = `/Transaction/${tag}/${detailData.userId}/${detailData.unitName} (${detailData.customerId}) - ${detailData.billDate}.jpeg`
  const deleteStorage = useDeleteValue()
  const handleDeleteStorage = async () => {
    setProcessDelete(true)
    if(detailData.paymentStatus){
      await deleteStorage.deleteObj(pathStorage)
    } else {
      handleDeleteDatabase()
    }
  }
  
  //Handle Delete Database
  const updates = null;
  const pathDatabase = `/transaction/${tag}/${detailData.userId}/${detailData.key}`
  const deleteDatabase = useDeleteValue()
  const handleDeleteDatabase = async () => {
    await deleteDatabase.deleteDb(pathDatabase, updates)
    setTimeout(() => {
      setProcessDelete(false)
      handleClose()
      enqueueSnackbar("Data has been deleted", {variant:"info"});
    }, 2000);
  }

  const handleClose = () => {
    handleCloseDetail()
    handleReset()
    handleGetData()
  };


  //Reset Value
  const handleReset = () => {
    setSuccess(false)
    setIsLoading(false)
    setCekImage(false)
    setErrUploadButton(false)
    setDataImage(null)
    setProcessDelete(false)
    setErrPaymentMethod(false)
    setValPayment('')
    setDeleteInfo('')
    setHoverImage(false)
    setVisible('')
    setPaymentMethodLogo('')
    setPaymentSelected(false)
  }

  React.useEffect(() => {
    if(deleteStorage.success){
      handleDeleteDatabase()
    }
  }, [deleteStorage.success])


  React.useEffect(() => {
    if(upload.urlPhoto){
      handleUpdate()
    }
  }, [upload.urlPhoto])


  React.useEffect(() => {
    if(detailData.paymentMethod === 'Tokopedia'){
      setPaymentMethodLogo(tokopediaLogos)
    }
    if(detailData.paymentMethod === 'OVO'){
      setPaymentMethodLogo(ovoLogos)
    }
    if(detailData.paymentMethod === 'Gopay'){
      setPaymentMethodLogo(gopayLogos)
    }
    if(detailData.paymentMethod === 'DANA'){
      setPaymentMethodLogo(danaLogos)
    }
  }, [detailData])
  

  return (
    <div>
      <Dialog
        sx={{display: visible}}
        fullWidth={true}
        maxWidth={'md'}
        open={openDetail}
        onClose={handleClose}
      >
        <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Stack>
            Detail Electric Bill
            <Typography>{detailData.createdAt}</Typography>
          </Stack>
          <Stack>
            <img  
              src={paymentMethodLogo}
              height='40px'
              width='auto'
            />
          </Stack>
        </DialogTitle>
        <Divider/>
        <DialogContent>
        <MainGrid item xs={12} container>
            <SubGrid item xs={5}>
              {/* COMPANY */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'10px'}} key='Company'>
                <Typography flex={1}>Company</Typography>
                <Typography>{detailData.company}</Typography>
              </Grid>
              {/* CUSTOMER ID */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'10px'}} key='Customer Id'>
                <Typography flex={1}>Customer Id</Typography>
                <Typography>{detailData.customerId}</Typography>
              </Grid>
              {/* UNIT NAME */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'10px'}} key='Unit Name'>
                <Typography flex={1}>Unit Name</Typography>
                <Typography>{detailData.unitName}</Typography>
              </Grid>
              {/* BILL DATE */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'10px'}} key='Bill Date'>
                <Typography flex={1}>Bill Date</Typography>
                <Typography>{detailData.billDate}</Typography>
              </Grid>
              {/* STAND MATER */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'10px'}} key='Stand Meter'>
                <Typography flex={1}>Stand Meter</Typography>
                <Typography>{detailData.standMeterFrom} - {detailData.standMeterUntil}</Typography>
              </Grid>
              {/* USAGE */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'10px'}} key='Usage'>
                <Typography flex={1}>Usage</Typography>
                <Typography>{detailData.usage} kW.h</Typography>
              </Grid>
              {/* PAYMENT METHOD */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'10px'}} key='Payment Method'>
                <Typography flex={1}>Payment Method</Typography>
                <Typography>{detailData.paymentMethod}</Typography>
              </Grid>
              {/* BILL */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'10px'}} key='Bill'>
                <Typography flex={1}>Bill</Typography>
                <Typography>Rp. {detailData.bill}</Typography>
              </Grid>
              {/* ADMIN FEE */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'10px'}} key='Admin Fee'>
                <Typography flex={1}>Admin Fee</Typography>
                <Typography>Rp. {detailData.adminFee}</Typography>
              </Grid>
              <Divider/>
              {/* COST */}  
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'10px'}} key='Cost'>
                <Typography sx={{fontWeight: 800, fontSize: '18px'}} flex={1}>Cost</Typography>
                <Typography sx={{fontWeight: 800, fontSize: '18px'}}>Rp. {detailData.cost}</Typography>
              </Grid>
              {/* CASHBACK */}
              <Grid sx={{display: 'flex', alignItems: 'center', mb:'10px', color: green[500]}} key='Cashback'>
                <Typography flex={1}>Cashback</Typography>
                <Typography>Rp. {detailData.cashback}</Typography>
              </Grid>
            </SubGrid>
            <SubGrid item xs sx={{justifyContent: 'flex-start'}}>
              {/* PAYMENT STATUS */}
              <Grid sx={{display: 'flex', alignItems: 'center'}} key='Payment Status'>
                <SubTitle flex={1}>Payment Status</SubTitle>
                {detailData.paymentStatus? 
                    <Chip size='small' label="Paid" color="success" icon={<DoneIcon />}/>
                    :
                    <Chip variant='outlined' size='small' label="Unpaid" color="warning" icon={<AttachMoneyIcon />}/>
                }
              </Grid>
              {!detailData.paymentStatus?
                <>
                  {/* Method */}
                  <Grid sx={{display: 'flex', alignItems: 'center', mb:'20px'}} key='Method'>
                    <Typography flex={1}>Method</Typography>
                    <Stack flex={2}>
                      <FormControl fullWidth>
                        <Select
                          required
                          error={errPaymentMethod}
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
                      key='Status'
                    >
                      <Typography flex={1}>Proof of payment</Typography>
                      <FormControlLabel
                        value="start"
                        control={
                          <Button color={errUploadButton? 'error' : 'primary'} onChange={handleGetImage} sx={{marginLeft: '15px'}} variant="contained" component="label">
                            Upload
                            <input hidden accept="image/*" multiple type="file" />
                          </Button>
                        }
                        label={dataImage? dataImage.name : ""}
                        labelPlacement="start"
                      >
                      </FormControlLabel>
                    </Grid>
                    :
                    ""
                  }
                </>
                :
                <>
                  <Typography>Proof of payment :</Typography>
                  {!skelton?
                    <Stack>
                      <IconButton 
                        aria-label="delete" 
                        size="small" 
                        onMouseEnter={handleHoverImage}
                        onMouseLeave={handleHoverImage}
                        onClick={handleModalImages}
                      >
                        <CardMedia
                          component="img"
                          image={detailData.paymentPhoto}
                          height='auto'
                          width='auto'
                          style={{
                            borderRadius: '5px', 
                          }}
                        />
                        {hoverImage?
                          <Stack
                            sx={{
                              borderRadius: '5px', 
                              position: 'absolute',
                              bgcolor: 'rgb(0,0,0,0.6)',
                              color: 'white',
                              height: '100%',
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <VisibilityIcon
                              sx={{
                                fontSize: '70px',
                              }}
                            />
                            <Typography>Preview</Typography>
                          </Stack>
                          :
                          ""
                        }
                      </IconButton>
                    </Stack>
                    :
                    <Skeleton variant="rounded"  height={400} />
                  }
                </>
              }
            </SubGrid>
          </MainGrid>
        </DialogContent>
        <DialogActions>
          <Stack sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Button 
              autoFocus 
              onClick={handleDeleteStorage} 
              color='error' 
              startIcon={<DeleteIcon />}
            >
              Delete data
            </Button>
            <Button autoFocus onClick={handleCloseDetail} color='success'>
              Close
            </Button>
          </Stack>
          {!detailData.paymentStatus?
            <Button onClick={beforeSumbitChecklist} variant='contained'>
              Update
            </Button>
            :
            ""
          }
        </DialogActions>
        {upload.isLoading || isLoading || processDelete? 
          <Backdrop
            sx={{ color: '#fff', zIndex: 1 }}
            open={upload.isLoading || isLoading || processDelete}
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
              (processDelete?
                <>
                  <Typography fontSize={30}>
                    Deleting {deleteStorage.info && deleteDatabase.info}
                  </Typography>
                  <CircularProgress 
                    color="primary" 
                    size={300}
                    sx={{
                      color: red[500],
                      position: 'absolute',
                      zIndex: 1,
                    }}
                  />
                </>
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
              )
            }
          </Backdrop>
          :
          ""
        }
      </Dialog>
      
      <ModalImages
        openModalImages={openModalImages}
        handleModalImages={handleModalImages}
        detailData={detailData}
      />
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