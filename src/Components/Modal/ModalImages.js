import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { AppBar, CardMedia, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  borderRadius: '5px',  
  // boxShadow: 24,
};

export default function ModalImages({openModalImages, handleModalImages, detailData}) {

  const handleClose = () => {
    handleModalImages()
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModalImages}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalImages}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" color='info'>
              <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <InfoIcon />
                </IconButton>
                <Typography>{detailData.unitName} - {detailData.billDate}</Typography>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Box sx={style}>
              <CardMedia
                component="img"
                image={detailData.paymentPhoto}
                height='auto'
                width='auto'
                style={{
                  borderRadius: '5px', 
                }}
                label='tes'
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
