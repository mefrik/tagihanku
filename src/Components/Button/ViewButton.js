import React, { useState } from "react"
import { Grid } from "@mui/material"
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import ModalFirst from "../Modal/ModalFirst"

  
const CustomizeButton = styled(Button)(() => ({
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: "12px",
    textTransform: "capitalize",
    lineHeight: "16px",
    display: "flex",
    justifyContent:"center",
    color: "#DCD6F7",
    backgroundColor: "Transparant",
    width: 'auto',
    boxShadow: "none",
    '&:hover': {
        color: "#A66CFF",
        backgroundColor: "Transparant",
        boxShadow: "none",
    },
    })
);

export default function ViewButton({
    id, 
    title, 
    link, 
    description ,
    threedImg,
    instagram,
    opensea,
    webtoon,
  }) {
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open)
  }
  return (
    <Grid>
        <Stack spacing={2} direction="row">
          <CustomizeButton variant="text" onClick={handleModal}>
                  [ View ... ]
          </CustomizeButton>
        </Stack>
        <ModalFirst 
          open={open} 
          handleModal={handleModal}
          id={id}
          title={title}
          link={link}
          description={description}
          threedImg={threedImg}
          instagram={instagram}
          opensea={opensea}
          webtoon={webtoon}
        />
    </Grid>
  )
}
