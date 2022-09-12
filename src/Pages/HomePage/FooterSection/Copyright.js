import { styled, Typography } from '@mui/material'
import React from 'react'
import CopyrightIcon from '@mui/icons-material/Copyright';

const CostumizeText = styled(Typography)(() => ({
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "14px",
    lineHeight: "24px",
    color: "#FFFFFF",
    display: "flex",
    marginRight: "5px",
    marginLeft: "5px",
}))

const CostumizeIconCopyright = styled(CopyrightIcon)(() => ({
  color: "#FFFFFF"
}))

export default function Copyright() {
  return (
    <>
      <CostumizeText>
        Yuraiko
      </CostumizeText>
      <CostumizeIconCopyright/>
      <CostumizeText>
        2022
      </CostumizeText>
    </>
  )
}
