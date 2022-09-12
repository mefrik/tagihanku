import { Grid, styled } from '@mui/material'
import React from 'react'
import PartnersContent from './PartnersContent'
import PartnersTitle from './PartnersTitle'
import Fade from 'react-reveal/Fade'

const CustomizeGridTitle = styled(Grid)(() => ({
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
}))

const CustomizeGridContents = styled(Grid)(() => ({
    marginTop: "60px",
    marginBottom: "60px",
}))

export default function IndexPartners() {
  return (
    <Grid sx={{height: 'auto', bgcolor: '#FFFFF',}}>
        <CustomizeGridTitle>
          <Fade bottom delay={500}>
            <PartnersTitle/>
          </Fade>
        </CustomizeGridTitle>
        <CustomizeGridContents>
            <PartnersContent/>
        </CustomizeGridContents>
    </Grid>
  )
}
