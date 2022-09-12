import React from 'react'
import CorouselScratches from '../../../Components/Carousel/CorouselScratches'

var items = [
    {
        id: 1,
        title: "One Peace",
        linkImage: "https://www.viu.com/ott/id/articles/wp-content/uploads/2021/08/One-Piece-_Viu-Slide-Banner.jpg",
    },
    {
        id: 2,
        title: "Bleach",
        linkImage: "https://berita.yodu.id/wp-content/uploads/2022/02/bleach-2022-thumbnails.jpg",
    },
    {
        id: 3,
        title: "Demon Slayer",
        linkImage: "https://static.wikia.nocookie.net/c92b72e9-bf36-43b4-bb6d-237609f5e574/scale-to-width-down/800",
    },
]

export default function BannerScratchesContent() {
  return (
    <CorouselScratches items={items}/>
  )
}

