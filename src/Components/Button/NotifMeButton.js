import React from "react"
import { Grid } from "@mui/material"
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

const CustomizeButton = styled(Button)(() => ({
    marginTop: "10px",
    width: "100%",
    height: "50px",

    fontFamily: 'Open Sans, sans-serif',
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "16px",
    textTransform: "capitalize",
    lineHeight: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    boxSizing: "border-box",
    boxShadow: "0px 4px 10px 2px rgba(175, 180, 255, 0.5)",
    color: "#FFFFF",
    backgroundColor: "rgba(166, 108, 255, 0.8)",
    borderRadius: "30px",
    '&:hover': {
        color: "#FFFFFF",
        backgroundColor: "rgba(166, 108, 255, 1)",
        border: "0px solid rgba(166, 108, 255, 1)",
        borderRadius: "30px",
        boxShadow: "0px 4px 10px 2px rgba(175, 180, 255, 0.5)",
        cursor: "pointer",
    },
    })
);

export default function NotifMeButton() {
  return (
    <Grid>
        <Stack spacing={2} direction="row">
            <CustomizeButton variant="contained">
                Notif me
            </CustomizeButton>
        </Stack>
    </Grid>
  )
}
