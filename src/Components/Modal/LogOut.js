import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { signout } from '../../Auth/AuthContext';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 'auto',
  width: 300,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  borderRadius: '5px 5px 5px 5px',
  p: 4,

  display: 'flex',
  flexDirection: 'column',
};

export default function LogOut({open, handleOpenModal}) {
  const params = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleClose = () => {
    handleOpenModal()
    navigate(params.pathname)
  }

  const handleLogOut = async () => {
    try{
      await signout()
      navigate('/')
      enqueueSnackbar("You has been LogOut from sistem", {variant:"warning"});
    }catch(error){
      console.log(error)
    }
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6">
            Wanna sign out ?
          </Typography> */}
          <Grid 
            item xs={12} 
            sx={{
              height: '100%', 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'space-around', 
              alignItems: 'center',
            }}
          >
            <Button size='large' variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
            <Button size='large' variant='contained' onClick={handleLogOut}>
              Sign Out
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
