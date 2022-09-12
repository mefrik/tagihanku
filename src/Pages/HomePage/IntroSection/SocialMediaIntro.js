import { Stack, styled } from '@mui/material'
import React from 'react'
import InstagramButton from '../../../Components/Button/InstagramButton'
import OpenSeaButton from '../../../Components/Button/OpenSeaButton'
import WebToonButton from '../../../Components/Button/WebToonButton'
import YoutubeButton from '../../../Components/Button/YoutubeButton'

const CostumizeStackSocialMedia = styled(Stack)(() => ({

}))

export default function SocialMediaIntro() {
  return (
      <CostumizeStackSocialMedia direction="row" spacing={2}>
          <InstagramButton size={30} animDelay={1500}/>
          <YoutubeButton size={30} animDelay={1800}/>
          <OpenSeaButton size={30} animDelay={2100}/>
          <WebToonButton size={35} animDelay={2400}/>
      </CostumizeStackSocialMedia>
  )
}
