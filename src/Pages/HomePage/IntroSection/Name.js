import { Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'

const CustomizeText = styled(Typography)(() => ({
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
    color: "#9C9EFE",
}))

export default function Name() {
  return (
    <CustomizeText>
        Yuraiko
    </CustomizeText>
  )
}
