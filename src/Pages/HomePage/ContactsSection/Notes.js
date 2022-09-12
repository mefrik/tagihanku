import { Stack, styled, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Fade from 'react-reveal/Fade'
// import SocialMediaContact from './SocialMediaContact'

const CostumizeBoxNotes = styled(Box)(() =>({
    maxWidth: "540px",
    width: "100%",
    height: "100%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
}))

const CostumizeStackNotes = styled(Stack)(() => ({

}))

const CostumizeTextNotes = styled(Typography)(() => ({
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "27px",
    textAlign: "start",
    color: "#9C9EFE",
}))

function Notes() {
  return (
    <CostumizeBoxNotes>
        {/* <SocialMediaContact/> */}
        <CostumizeStackNotes spacing={2}>
            <Fade bottom delay={300}>
                <CostumizeTextNotes>
                    I am currently living and working in Indonesia as freelance Designer & illustrator. 
                </CostumizeTextNotes>
            </Fade>
            <Fade bottom delay={600}>
                <CostumizeTextNotes>
                    What can I say, I love my job! 
                </CostumizeTextNotes>
            </Fade>
            <Fade bottom delay={900}>
                <CostumizeTextNotes>
                    I am having trouble writing compelling texts, not to mention about myself so i will try to make this as short and informative as possible.
                </CostumizeTextNotes>
            </Fade>
        </CostumizeStackNotes>
    </CostumizeBoxNotes>
  )
}

export default Notes