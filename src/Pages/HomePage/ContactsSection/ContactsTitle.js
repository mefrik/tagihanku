import { styled, Typography } from '@mui/material'
import React from 'react'

const CustomizeText = styled(Typography)(() => ({
  fontFamily: 'Open Sans, sans-serif',
  fontWeight: "400",
  fontSize: "48px",
  display: "flex",
  color: "#393E46",
}))

export default function ContactsTitle() {
  return (
    <>
      <CustomizeText>
        Contact
      </CustomizeText>
      <CustomizeText>
        Me
      </CustomizeText>
    </>
  )
}
