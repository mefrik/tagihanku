import { Stack, styled } from '@mui/material'
import React from 'react'
import InstagramButton from '../../Components/Button/InstagramButton'
import OpenSeaButton from '../../Components/Button/OpenSeaButton'
import WebToonButton from '../../Components/Button/WebToonButton'
import YoutubeButton from '../../Components/Button/YoutubeButton'

const CostumizeStackSocialMedia = styled(Stack)(() => ({

}))

export default function SocialMediaContact() {
  return (
    <CostumizeStackSocialMedia spacing={2}>
        <InstagramButton size={40}/>
        <YoutubeButton size={40}/>
        <OpenSeaButton size={40}/>
        <WebToonButton size={45}/>
    </CostumizeStackSocialMedia>
  )
}
