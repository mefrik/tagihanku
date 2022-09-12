import { Grid, styled } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Copyright from './Copyright'

const CostumizeGridFooter = styled(Grid)(() => ({
    marginTop: "30px",
}))
const CostumizeFooterBox = styled(Box)(() => ({
    width: "100%",
    height: "50px",
    background: "#424874",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}))

export default function IndexFooter() {
  return (
    <CostumizeGridFooter>
        <CostumizeFooterBox>
          <Copyright/>
        </CostumizeFooterBox>
    </CostumizeGridFooter>
  )
}
