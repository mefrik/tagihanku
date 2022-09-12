import React from "react"
import { CardMedia, Grid } from "@mui/material"
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import Link from '@mui/material/Link'
import Fade from 'react-reveal/Fade'

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

export default function InstagramButton({size, animDelay}) {
  return (
    <Grid>
      <Fade bottom delay={animDelay}>
        <Stack spacing={2} direction="row">
            <CustomizeToolTip title={<CustomizeLink href="#" underline="none">@Yuraiko</CustomizeLink>}>
              <CustomizeIcon
                component="img"
                alt="instagram"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Instagram.svg/2048px-Instagram.svg.png"
                size={size}
              />
            </CustomizeToolTip>
        </Stack>
      </Fade>
    </Grid>
  )
}
