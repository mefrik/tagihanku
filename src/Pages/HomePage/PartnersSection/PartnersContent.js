import { Grid, Stack, styled } from '@mui/material'
import React from 'react'
import CardPartners from '../../../Components/Card/CardPartners'
import Fade from 'react-reveal/Fade'

const data = [
  {
    id: 1,
    size: 170,
    title: "Wacom Intuos",
    linkWeb: "https://www.wacom.com/en-us",
    linkImage: "https://i.imgur.com/MPRX3hs.png",
    description: "Wacom is my favorite tools for digital drawing",
    delay: 300,
  },
  {
    id: 2,
    size: 100,
    title: "Clip Studio Paint",
    linkWeb: "https://www.clipstudio.net/en/",
    linkImage: "https://pbs.twimg.com/media/EjQewAyWsAA5udy.png",
    description: "CSP is powerfull tools to make my imagination come to Scratches",
    delay: 600,
  },
  {
    id: 3,
    size: 90,
    title: "Blender",
    linkWeb: "https://www.blender.org/",
    linkImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Logo_Blender.svg/2560px-Logo_Blender.svg.png",
    description: "An 3D tools for free user like me, hahaha...",
    delay: 900,
  },
  {
    id: 4,
    size: 180,
    title: "Sketchup",
    linkWeb: "https://www.sketchup.com/",
    linkImage: "https://1000logos.net/wp-content/uploads/2021/04/SketchUp-logo.png",
    description: "An 3D tools for free user like me, hahaha...",
    delay: 1200,
  },
]

const CostumizeGridContent = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",

}))

const CostumizeStackContent = styled(Stack)(() => ({

}))

export default function PartnersContent() {
  return (
    <CostumizeGridContent 
        container 
        spacing={{ xs: 2, md: 2 }} 
        columns={{ xs: 3, sm: 6, md: 12 }} 
    >
      {data.map((index) => (
        <CostumizeStackContent key={index.id} xs={4}>
          <Fade bottom delay={index.delay}>
            <CardPartners 
                id={index.id}
                size={index.size}
                title={index.title}
                linkWeb={index.linkWeb}
                linkImage={index.linkImage}
                description={index.description}
            />
          </Fade>
        </CostumizeStackContent>
      ))}
    </CostumizeGridContent>
  )
}
