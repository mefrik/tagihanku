import React from 'react'
import { Grid } from "@mui/material"
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import Link from '@mui/material/Link'
import ShareIcon from '@mui/icons-material/Share'


const CustomizeToolTip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#9C9EFE',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#9C9EFE",
    color: '#FFFFFF',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    TransitionComponent: "Zoom",
  },
}));

const CustomizeLink = styled(Link)(() => ({
  color: 'inherit',
  fontFamily: 'Open Sans',
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "19px",
  textAlign: "center",
  textTransform: "capitalize",
}))

const CustomizeIcon = styled(ShareIcon)(({size}) => ({
  color: "#AFB4FF",
  width: `${size}px`,
  height: `${size}px`,
  ":hover" : {
    color: "#9C9EFE",
  }
}))

export default function ShareButton({size}) {
return (
    <Grid>
        <Stack spacing={2} direction="row">
            <CustomizeToolTip title={<CustomizeLink underline="none">Share now :)</CustomizeLink>}>
                <CustomizeIcon size={size}/>
            </CustomizeToolTip>
        </Stack>
    </Grid>
    )
}