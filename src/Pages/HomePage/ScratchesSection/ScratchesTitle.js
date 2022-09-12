import { styled, Typography } from '@mui/material'
import React from 'react'

const CustomizeText = styled(Typography)(() => ({
  fontFamily: 'Open Sans, sans-serif',
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "48px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  color: "#222831",
  height: "100px",
}))

export default function ScratchesTitle() {
  return (
    <CustomizeText>
      Scratches
    </CustomizeText>
  )
}
