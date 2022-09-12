import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import { CardMedia, Fade, Grid, Stack, styled } from '@mui/material'
import OpenSeaButton from '../Button/OpenSeaButton'
import ThreedButton from '../Button/ThreedButton'
import InstagramButton from '../Button/InstagramButton'
import WebToonButton from '../Button/WebToonButton'
import CloseIcon from '@mui/icons-material/Close'
import ShareButton from '../Button/ShareButton'
// import OrderButton from '../Button/OrderButton'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "fit-content",
    bgcolor: '#FFFFFF',
    borderRadius: '4px',
    boxShadow: "0px 4px 4px rgba(175, 180, 255, 0.25)",
    p: 4,
};

const CostumizeCardMediaModal = styled(CardMedia)(() => ({
    borderRadius: "4px"
}))

const CostumizeCardTitle = styled(Typography)(() => ({
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "40px",
    lineHeight: "54px",
    display: "flex",
    alignItems: "center",
    color: "#222831",
}))

const CostumizeCardDescription = styled(Typography)(() => ({
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "16px",
    display: "flex",
    alignItems: "center",
    color: "#A6B1E1",
}))

const CostumizeGridAvailable = styled(Grid)(() => ({
    justifyContent: "center",
    alignContent: "center"
}))

const CoztumizeCloseIcon = styled(CloseIcon)(() => ({
    color: "#DCD6F7",
    fontSize: "40px",
    '&:hover': {
        color: "#A66CFF",
        cursor: "pointer",
    },    
}))

const CostumizeGridAction = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    //Ini perlu ada mengenali media screen @media untuk responsive
}))

export default function ModalFirst({
        open, 
        handleModal, 
        id, 
        title, 
        link, 
        description,
        threedImg,
        instagram,
        opensea,
        webtoon,
    }) {
    return (
        <Modal
            open={open}
            onClose={handleModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Grid 
                        container 
                        spacing={{ xs: 2, md: 3 }} 
                        columns={{ xs: 3, sm: 6, md: 12 }}
                    >
                        <Grid item xs>
                            <CostumizeCardMediaModal
                                height="auto"
                                width= "auto"
                                key={id}
                                component="img"
                                image={link}
                            />
                        </Grid>
                        <CostumizeGridAvailable item xs={5}>
                            <CostumizeCardTitle variant="h6" component="h2">
                                {title}
                            </CostumizeCardTitle>
                            <CostumizeCardDescription sx={{ mt: 2, mb: 2 }}>
                                {description}
                            </CostumizeCardDescription>
                            <Stack direction="row" spacing={2}>
                                    <ShareButton size={30}/>
                                {threedImg?
                                    <ThreedButton size={30}/>
                                    :
                                    ""
                                }
                                {instagram?
                                    <InstagramButton size={30}/>
                                    :
                                    ""
                                }
                                {opensea?
                                    <OpenSeaButton size={30}/>
                                    :
                                    ""
                                }
                                {webtoon?
                                    <WebToonButton size={35}/>
                                    :
                                    ""
                                }
                            </Stack>
                        </CostumizeGridAvailable>
                        <CostumizeGridAction item>
                            <CoztumizeCloseIcon onClick={handleModal}/>
                            {/* <OrderButton/> */}
                        </CostumizeGridAction>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    )
}
