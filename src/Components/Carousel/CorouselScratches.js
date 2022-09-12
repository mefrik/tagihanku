import React from 'react'
import { Icon, styled } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import ArrowForwardNewIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import CardBanner from '../Card/CardBanner'

const CostumizeNavButton = styled(Icon)(() => ({
    color: "#DCD6F7",
    height: 'auto',
    width: 'auto',
    ":hover" : {
        cursor: 'pointer',
        color: "#A66CFF",
    },
}))
const CostumizeNextIcon = styled(ArrowForwardNewIosIcon)(() => ({
    fontSize: `70px`,
}))
const CostumizeBackIcon = styled(ArrowBackIosNewIcon)(() => ({
    fontSize: `70px`,
}))

export default function CorouselScratches({items}) {
  return (
    <Carousel
        animation={'fade'}
        duration={500}
        swipe={true}
        cycleNavigation={true}

        navButtonsAlwaysInvisible={true}
        fullHeightHover={false}

        NavButton={({onClick, next, prev}) => {
            return (
                <CostumizeNavButton onClick={onClick}>
                    {next && <CostumizeNextIcon/>}
                    {prev && <CostumizeBackIcon/>}
                </CostumizeNavButton>
            )
        }}

        indicators={false}
    >
        {
            items.map((item) => 
                <CardBanner key={item.id} item={item}/>
            )
        }
    </Carousel>
  )
}
