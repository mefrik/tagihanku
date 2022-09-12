import React from "react"
import { CardMedia, Grid } from "@mui/material"
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import Link from '@mui/material/Link'

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

const CustomizeLink = styled(Link)(() => ({
  color: 'inherit',
  fontFamily: 'Open Sans',
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "19px",
  textAlign: "center",
  textTransform: "lowercase",
}))

const CustomizeIcon = styled(CardMedia)(({size}) => ({
  width: `${size}px`,
  height: `${size}px`,
}))

export default function LinkedinButton({size}) {
  return (
    <Grid>
        <Stack spacing={2} direction="row">
            <CustomizeToolTip title={<CustomizeLink href="#" underline="none">@Yuraiko</CustomizeLink>}>
              <CustomizeIcon
                component="img"
                alt="instagram"
                src="https://cdn.kibrispdr.org/data/739/linkedin-logo-image-0.png"
                size={size}
              />
            </CustomizeToolTip>
        </Stack>
    </Grid>
  )
}
