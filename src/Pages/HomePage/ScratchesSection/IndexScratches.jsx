import { Grid, styled } from '@mui/material'
import React from 'react'
import ScratchesContents from './ScratchesContents'
import ScratchesTitle from './ScratchesTitle'
import Fade from 'react-reveal/Fade'
import SeeAllMyScratchesButton from '../../../Components/Button/SeeAllMyScratchesButton'

const CustomizeGridTitle = styled(Grid)(() => ({
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
}))

const CustomizeGridContents = styled(Grid)(() => ({
    marginTop: "60px",
    marginBottom: "60px",
}))

const CustomizeGridButton = styled(Grid)(() => ({
    marginTop: "60px",
    marginBottom: "60px",
    display: 'flex',
    justifyContent: 'left',
}))

export default function IndexScratches() {
  return (
    <Grid sx={{height: 'auto', bgcolor: '#FFFFF',}}>
        <CustomizeGridTitle>
            <Fade bottom delay={300}>
                <ScratchesTitle/>
            </Fade>
        </CustomizeGridTitle>
        <CustomizeGridContents>
            <ScratchesContents/>
        </CustomizeGridContents>
        <CustomizeGridButton>
            <Fade bottom delay={300}>
                <SeeAllMyScratchesButton/>
            </Fade>
        </CustomizeGridButton>
    </Grid>
  )
}
