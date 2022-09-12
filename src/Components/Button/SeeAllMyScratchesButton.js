import React from "react"
import { Grid } from "@mui/material"
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Link } from "react-router-dom"


const CustomizeButton = styled(Button)(() => ({
    width: "auto",
    height: "50px",
    
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "16px",
    textTransform: "capitalize",
    lineHeight: "22px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    boxSizing: "border-box",
    color: "#FFFFFF",
    backgroundColor: "rgba(166, 108, 255, 0.8)",
    borderRadius: "30px",
    boxShadow: "0px 4px 10px 2px rgba(175, 180, 255, 0.5)",
    '&:hover': {
        color: "#FFFFFF",
        backgroundColor: "rgba(166, 108, 255, 1)",
        boxShadow: "0px 4px 10px 2px rgba(175, 180, 255, 0.5)",
        borderRadius: "30px",
    }
    })
)

export default function SeeAllMyScratchesButton() {
  return (
    <Grid>
        <Stack spacing={2} direction="row">
          <Link to='/scratches'>
            <CustomizeButton variant="contained">See All My Scratches</CustomizeButton>
          </Link>
        </Stack>
    </Grid>
  )
}
