import { Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'

const CustomizeText = styled(Typography)(() => ({
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "40px",
    display: "flex",
    alignItems: "center",
    color: "#222831",
}))

export default function IntroTitle() {
  return (
    <>
        <CustomizeText variant='h1'>
            3D & Comic Artist Designer
        </CustomizeText>
        <CustomizeText variant='h1'>
            Based in Central Java
        </CustomizeText>
    </>
  )
}
