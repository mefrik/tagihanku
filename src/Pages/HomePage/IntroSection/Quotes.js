import { Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'
import Flip from 'react-reveal/Flip'

const CustomizeText = styled(Typography)(() => ({
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "18px",
    letterSpacing: "1px",
    display: "flex",
    alignItems: "center",
    color: "#9C9EFE",
    lineHeight: "27px",
}))

export default function Quotes() {
  return (
    <>
        <CustomizeText variant='h6'>
          <Flip left cascade delay={1200}>
            Every great design begins with even better story
          </Flip>
        </CustomizeText>
    </>
  )
}
