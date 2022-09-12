import React from 'react'
import CardMedia from '@mui/material/CardMedia';
import { Link, styled } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'

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
    fontSize: 16,
  },
}));

const CostumizeCardMedia = styled(CardMedia)(() => ({
  display: "flex",
  '&:hover': {
    cursor: "pointer",
  },
}))

export default function CardPartners({
    id,
    size, 
    title, 
    linkWeb,
    linkImage,
    description,
  }) {
  return (
    <CustomizeToolTip title={description}>
      <Link href={linkWeb} rel="noopener noreferrer" target="_blank">
        <CostumizeCardMedia
          height= {`${size}rem`}
          key={id}
          component="img"
          image={linkImage}
        />
      </Link>
    </CustomizeToolTip>
  )
}