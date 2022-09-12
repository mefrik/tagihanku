import { Grid, styled } from '@mui/material'
import React from 'react'
import Fade from 'react-reveal/Fade'
import CardScratches from '../../../../Components/Card/CardScratches'

const data = [
  {
    id: 1,
    title: "Lydia#21",
    link: "https://www.arweave.net/wR0uT60rDKPmSTt15GAFznjalRAc4qNGWRr2hqLxMpI?ext=jpg",
    description: "Girl who always keep smile every day",
    threedImg: false,
    instagram: false,
    opensea: false,
    webtoon: false,
    delay: 300,
  },
  {
    id: 2,
    title: "Monic#13",
    link: "https://pbs.twimg.com/profile_images/1485454345135013888/w0M16vjl_400x400.jpg",
    description: "Girl who always keep smile every day",
    threedImg: false,
    instagram: false,
    opensea: false,
    webtoon: false,
    delay: 600,
  },
  {
    id: 3,
    title: "Lydia#59",
    link: "https://miro.medium.com/max/1080/1*g80lcToiCehv2gh0zDdUmg.jpeg",
    description: "Girl who always keep smile every day",
    threedImg: false,
    instagram: false,
    opensea: false,
    webtoon: false,
    delay: 900,
  },
  {
    id: 4,
    title: "Lydia#42",
    link: "https://www.arweave.net/NRzzk3iI9cv_9XbZC-wlb6jxeoMJKsxeMugoCToxy-s?ext=jpg",
    description: "Girl who always keep smile every day",
    threedImg: false,
    instagram: false,
    opensea: false,
    webtoon: false,
    delay: 1200,
  },
  {
    id: 5,
    title: "Andreas#55",
    link: "https://i.redd.it/jw3z9i1cfvq71.gif",
    description: "Girl who always keep smile every day",
    threedImg: true,
    instagram: false,
    opensea: false,
    webtoon: false,
    delay: 300,
  },
  {
    id: 6,
    title: "Andreas#29",
    link: "https://cdn-612d39b2c1ac189e9851cc81.closte.com/wp-content/uploads/2021/11/Mystic-Girls-Club-2-360x360.jpeg",
    description: "Girl who always keep smile every day",
    threedImg: false,
    instagram: false,
    opensea: false,
    webtoon: false,
    delay: 600,
  },
  {
    id: 7,
    title: "Andreas#102",
    link: "https://miro.medium.com/max/1313/1*ibsAqEkGXlNKb63ZCd1EKw.gif",
    description: "Girl who always keep smile every day",
    threedImg: true,
    instagram: false,
    opensea: false,
    webtoon: false,
    delay: 900, 
  },
  {
    id: 8,
    title: "Andreas#46",
    link: "https://nftsolana.io/wp-content/uploads/2021/11/RAEUcy6o_400x400.jpg",
    description: "Girl who always keep smile every day",
    threedImg: false,
    instagram: false,
    opensea: false,
    webtoon: false,
    delay: 1200,
  },
]

const CostumizeGrid = styled(Grid)(() =>({
  
}))

export default function Content3D() {
  return (
    <CostumizeGrid 
      container 
      spacing={{ xs: 2, md: 2 }} 
      columns={{ xs: 3, sm: 6, md: 18 }} 
      rowSpacing={2}
    >
      {data.map((index) => (
        <Grid key={index.id} item xs={3}>
          <Fade bottom delay={index.delay} mountOnEnter={true}>
            <CardScratches 
              id={index.id}
              title={index.title}
              link={index.link}
              description={index.description}
              threedImg={index.threedImg}
              instagram={index.instagram}
              opensea={index.opensea}
              webtoon={index.webtoon}
            />
          </Fade>
        </Grid>
      ))}
    </CostumizeGrid>
  )
}
