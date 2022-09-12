import { Grid, styled } from '@mui/material'
import React from 'react'
import ProjectContent from './ProjectContent'
import ProjectsTitle from './ProjectsTitle'
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

export default function IndexProjects() {
  return (
    <Grid sx={{height: 'auto', bgcolor: '#FFFFF',}}>
        <CustomizeGridTitle>
          <Fade bottom delay={300}>
            <ProjectsTitle/>
          </Fade>
        </CustomizeGridTitle>
        <CustomizeGridContents>
          <Fade timeout={1500} delay={600}>
            <ProjectContent/>
          </Fade>
        </CustomizeGridContents>
    </Grid>
  )
}
