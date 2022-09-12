import { CardMedia, Grid, styled, Typography } from '@mui/material'
import React from 'react'

const CostumizeCardGrid =styled(Grid)(() => ({
    justifyContent: "center",
    width: 'auto',
    height: "auto",
}))

const ImageGrid = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    padding: '30px',
    boxShadow: 'none',
    background: '#F4EEFF',
    borderRadius: '3px',
    transition: 'ease-in-out 0.5s',
    ":hover": {
        boxShadow: "0px 4px 4px rgba(275, 180, 255, 1)",
    }
}));
const ImageBox = styled(CardMedia)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '293px',
    height: '447px',
    borderRadius: '3px',
}))
const DetailGrid = styled(Grid)(() => ({
    width: '400px',
    padding: '20px',
    boxShadow: 'none',
}));

const CostumizeTitle = styled(Typography)(() => ({
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: "800",
    fontStyle: "normal",
    color: '#A66CFF',
    fontSize: '24px'
}))
const CostumizeCompany = styled(Typography)(() => ({
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: "400",
    fontStyle: "normal",
    color: '#A6B1E1',
    fontSize: '20px',
}))
const CostumizeDescription = styled(Typography)(() => ({
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: "normal",
    color: '#393E46',
    fontSize: '14px',
    textAlign: 'justify',
    textOverflow: 'ellipsis',
}))

export default function CardPoject({item}) {
  return (
    <CostumizeCardGrid
        container
        columns={{ xs: 3, sm: 6, md: 12 }}
    >
        <ImageGrid item>
            <ImageBox
                height="100%"
                width= "100%"
                component="img"
                image={item.linkImage}
            />
        </ImageGrid>
        <DetailGrid item>
            <CostumizeTitle>
                {item.title}
            </CostumizeTitle>
            <CostumizeCompany>
                {item.company}
            </CostumizeCompany>
            <CostumizeDescription>
                {item.description}
            </CostumizeDescription>
        </DetailGrid>
    </CostumizeCardGrid>
  )
}
