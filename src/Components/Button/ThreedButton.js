import React from 'react'
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation'
import { Grid } from "@mui/material"
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import Link from '@mui/material/Link'

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

const CustomizeIcon = styled(ThreeDRotationIcon)(({size}) => ({
  color: "#AFB4FF",
  width: `${size}px`,
  height: `${size}px`,
  ":hover" : {
    color: "#9C9EFE"
  }
}))

export default function ThreedButton({size}) {
return (
  <Grid>
      <Stack spacing={2} direction="row">
          <CustomizeToolTip title={<CustomizeLink underline="none">3D Image</CustomizeLink>}>
              <CustomizeIcon size={size}/>
          </CustomizeToolTip>
      </Stack>
  </Grid>
)
}