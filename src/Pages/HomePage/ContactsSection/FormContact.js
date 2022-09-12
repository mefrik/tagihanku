import { Box, styled, TextField } from '@mui/material'
import React from 'react'
import NotifMeButton from '../../../Components/Button/NotifMeButton'
import ContactsTitle from './ContactsTitle'

const CostumizeBoxContact = styled(Box)(() =>({
    maxWidth: "540px",
    width: "100%",
    height: "auto",
    padding: "50px",

    background: "#FFFFF",
    boxShadow: "0px 2px 4px 2px rgba(175, 180, 255, 0.25)",
    borderRadius: "4px",
}))

const CostumizeTextField = styled(TextField)(() => ({
  width: "100%",
  '& label.Mui-focused': {
    color: '#A6B1E1',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#A6B1E1',
  },
  '&:hover label.Mui-focused': {
    color: "#A66CFF"
  },
  '& .MuiInput-root': {
    color: "#A66CFF",
    fontSize: "18px",
  },
  '&:hover .MuiFormLabel-root': {
    color: "#A66CFF",
  },
}))
 
export default function FormContact() {
  return (
    <CostumizeBoxContact>
      <ContactsTitle/>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <CostumizeTextField 
          id="name" 
          label="Write your name here" 
          variant="standard"
          margin="dense"
        />
        <CostumizeTextField 
          id="email" 
          label="What's your email" 
          variant="standard"
          margin="dense"
        />
        <CostumizeTextField 
          id="message" 
          label="Type's your message here ..." 
          variant="standard"
          multiline
          rows={4}
          margin="dense"
        />
      </Box>
      <NotifMeButton/>
    </CostumizeBoxContact>
  )
}
