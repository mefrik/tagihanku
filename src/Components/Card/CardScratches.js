import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import ViewButton from '../Button/ViewButton';
import ThreedButton from '../Button/ThreedButton';


const CostumizeCard = styled(Card)(() => ({
  borderRadius: "4px",
  boxShadow: "0px 4px 4px rgba(175, 180, 255, 0.25)",
  width: "auto",
  height: "auto",
  background: "rgba(255, 255, 255, 1)",
  transition: 'ease-in-out 0.5s',
  '&:hover': {
    boxShadow: "0px 4px 4px rgba(275, 180, 255, 1)",
  },  
}))

const CostumizeCardTitle = styled(Typography)(() => ({
  fontFamily: 'Open Sans, sans-serif',
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "20px",
  lineHeight: "27px",
  display: "flex",
  alignItems: "center",
  color: "#222831",
}))

const CostumizeCardDescription = styled(Typography)(() => ({
  fontFamily: 'Open Sans, sans-serif',
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "16px",
  display: "flex",
  alignItems: "center",
  color: "#A6B1E1",
}))

const CostumizeCardActions = styled(CardActions)(() => ({
  display: "flex",
  alignContent: "center",
  justifyContent: "flex-end",
}))

export default function CardScratches({
    id, 
    title, 
    link, 
    description, 
    threedImg,
    instagram,
    opensea,
    webtoon,
  }) {
  return (
    <CostumizeCard>
      <CardMedia
        height="100%"
        width= "100%"
        key={id}
        component="img"
        image={link}
      />
      <CardContent>
        <CostumizeCardTitle gutterBottom>
          {title}
        </CostumizeCardTitle>
        <CostumizeCardDescription>
          {description}
        </CostumizeCardDescription>
      </CardContent>
      <CostumizeCardActions>
        {threedImg?
          <ThreedButton size={20}/>
          :
          ""
        }
        <ViewButton 
          id={id}
          title={title}
          link={link}
          description={description}
          threedImg={threedImg}
          instagram={instagram}
          opensea={opensea}
          webtoon={webtoon}
        />
      </CostumizeCardActions>
    </CostumizeCard>
  )
}