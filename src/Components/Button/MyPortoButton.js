import React from "react"
import { Grid } from "@mui/material"
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

  
const CustomizeButton = styled(Button)(() => ({
    width: "130px",
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
    color: "rgba(166, 108, 255, 0.8)",
    backgroundColor: "#FFFFFF",
    borderRadius: "30px",
    boxShadow: "0px 4px 10px 2px rgba(175, 180, 255, 0.5)",
    '&:hover': {
        color: "rgba(166, 108, 255, 1)",
        backgroundColor: "#FEFEFE",
        borderRadius: "30px",
        boxShadow: "0px 4px 10px 2px rgba(175, 180, 255, 0.5)",
    },
    })
);

export default function MyPortoButton() {
  return (
    <Grid>
        <Stack spacing={2} direction="row">
            <CustomizeButton variant="contained">
                    My Porto
            </CustomizeButton>
        </Stack>
    </Grid>
  )
}
