import React from "react"
import { Grid } from "@mui/material"
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

const CustomizeToolTip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  TransitionComponent: "Zoom",
  [`& .${tooltipClasses.arrow}`]: {
    color: '#9C9EFE',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#9C9EFE",
    color: '#FFFFFF',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));


const CustomizeButton = styled(Button)(() => ({
    width: "150px",
    height: "30px",

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
    color: "rgba(166, 108, 255, 0.8)",
    backgroundColor: "#FFFFFF",
    border: "3px solid #DCD6F7",
    borderRadius: "10px",
    boxShadow: "none",
    '&:hover': {
        color: "#FFFFFF",
        backgroundColor: "rgba(166, 108, 255, 0.8)",
        border: "0px solid rgba(166, 108, 255, 0.8)",
        borderRadius: "10px",
        boxShadow: "none",
    },
    })
);

export default function OrderButton() {
  return (
    <Grid>
        <Stack spacing={2} direction="row">
          <CustomizeToolTip title="@Yuraiko">
            <CustomizeButton disabled variant="contained">
              <WhatsAppIcon sx={{ mr: 0.5 }}/>
              Order
            </CustomizeButton>
          </CustomizeToolTip>
        </Stack>
    </Grid>
  )
}
