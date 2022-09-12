import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';


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

export default function AddElectricity({open, handleOpen, tag}) {
    console.log(open)
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    handleOpen()
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
            aaa
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
