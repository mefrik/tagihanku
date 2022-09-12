import { CardMedia, Grid, styled, Typography } from '@mui/material'
import React from 'react'

const CostumizeCardGrid =styled(Grid)(() => ({
    
}))

const ImageGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "end",
    boxShadow: 'none',
    background: 'none',
    borderRadius: '3px',
    transition: 'ease-in-out 0.5s',
}));
const ImageBox = styled(CardMedia)(() => ({
    justifyContent: "center",
    alignItems: "center",
    objectFit: 'contain',
    width: 'auto',
    height: '25.3vh',
}))

const CostumizeTitle = styled(Typography)(() => ({
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: "800",
    fontStyle: "normal",
    color: '#A66CFF',
    fontSize: '12px',
    position: 'absolute',
    
    background: 'rgb(255,255,255,0.8)',
    padding: '5px',
    borderRadius: '0px 5px 0px 0px',
}))

export default function CardBanner({item}) {
  return (
    <CostumizeCardGrid>
        <ImageGrid>
            <ImageBox
                component="img"
                image={item.linkImage}
            />
            <CostumizeTitle>
                {item.title}
            </CostumizeTitle>
        </ImageGrid>
    </CostumizeCardGrid>
  )
}
