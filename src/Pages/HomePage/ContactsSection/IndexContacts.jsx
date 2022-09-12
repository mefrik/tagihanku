import { Grid, styled } from '@mui/material'
import React from 'react'
import FormContact from './FormContact'
import Notes from './Notes'
import Fade from 'react-reveal/Fade'

const CostumizeGridContract = styled(Grid)(() => ({
  height: 'auto', 
  display:"flex", 
  justifyContent:"center",
}))

const CustomizeGridForm = styled(Grid)(() => ({
  display: "flex",
  alignContent: "center",
  justifyContent: "right",
  padding: "10px",
}))

const CustomizeGridNotes = styled(Grid)(() => ({
  display: "flex",
  alignContent: "center",
  justifyContent: "left",
  padding: "10px",
}))

export default function IndexContacts() {
  return (
    <CostumizeGridContract container>
      <Fade bottom delay={300}>
        <CustomizeGridForm>
          <FormContact/>
        </CustomizeGridForm>
      </Fade>
      <CustomizeGridNotes>
        <Notes/>
      </CustomizeGridNotes>
    </CostumizeGridContract>
  )
}
