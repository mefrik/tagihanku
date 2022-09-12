import React from 'react'
import { Icon, styled } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import ArrowForwardNewIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import AdjustIcon from '@mui/icons-material/Adjust'
import CardPoject from '../Card/CardPoject'

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
const CostumizeDotsIcon = styled(AdjustIcon)(() => ({
    ":hover" : {
        cursor: 'pointer',
        color: "#A66CFF",
    },
}))

export default function CarouselProject({items}) {
  return (
    <Carousel 
        animation={'slide'}
        duration={500}
        swipe={true}
        cycleNavigation={true}

        navButtonsAlwaysVisible={true}
        fullHeightHover={false}
        NavButton={({onClick, next, prev}) => {
            return (
                <CostumizeNavButton onClick={onClick}>
                    {next && <CostumizeNextIcon/>}
                    {prev && <CostumizeBackIcon/>}
                </CostumizeNavButton>
            )
        }}

        indicators={true}
        IndicatorIcon={<CostumizeDotsIcon/>}
        indicatorIconButtonProps={{
            style: {
                padding: '5px', 
                color: '#DCD6F7'
            }
        }}
        activeIndicatorIconButtonProps={{
            style: {
                color: '#A66CFF',
            }
        }}
        indicatorContainerProps={{
            style: {
                marginTop: '30px',
                textAlign: 'center'
            }
        }}
    >
        {
            items.map((item) => 
                <CardPoject key={item.id} item={item}/>
            )
        }
    </Carousel>
  )
}
