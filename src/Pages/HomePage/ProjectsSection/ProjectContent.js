import React from 'react'
import CarouselProject from '../../../Components/Carousel/CarouselProject'

var items = [
    {
        id: 1,
        company: "Comic House Banyumas",
        title: "Adit Menyusur Lorong Waktu",
        description: "Dalam komik Babad Banyumas atau yang disebut juga dengan Komik Adit Menyusur Lorong Waktu. Saya berperan sebagai background illustrator, yang membuat background dari 3D ataupun 2D. Proyek Batch 1 ini membutuhkan waktu sekitar 3 bulan kurang. Kurang lebih, model 3D yang saya kerjakan pada saat program Batch 1 ini antara lain, Sebagian Bangunan Pajajaran. Bangunan Pendhopo Bupati Banyumas, Bangunan Kadipaten Wirasaba, Pintu/Gerbang Kadipaten Wirasaba, Sebagian bangunan Kesultanan Pajang, Pintu gerbang Kesultanan Pajang, Ruangan Joko Kaiman, Pintu Joko Kaiman, Rumah tua kakek pemain karakter utama, Pohon beringin, Kediaman Bagus Mangun, Kediaman Kyai Mranggi,",
        linkImage: "https://cdn1-production-images-kly.akamaized.net/hii9T-iO31i7Dbg3IA71Q6Pq5-A=/640x853/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/4005121/original/014039300_1650820875-Babad_Banyumas.jpg",
    },
    {
        id: 2,
        company: "Comic House Banyumas",
        title: "Raden Kamandaka",
        description: "Dalam komik Raden Kamandaka saya berperan sebagai background illustrator, yang membuat background dari 3D ataupun 2D. Proyek Batch 1 ini membutuhkan waktu sekitar 3 bulan kurang. Kurang lebih, model 3D yang saya kerjakan pada saat program Batch 1 ini antara lain, Sebagian Bangunan Pajajaran. Bangunan Pendhopo Bupati Banyumas, Bangunan Kadipaten Wirasaba, Pintu/Gerbang Kadipaten Wirasaba, Sebagian bangunan Kesultanan Pajang, Pintu gerbang Kesultanan Pajang, Ruangan Joko Kaiman, Pintu Joko Kaiman, Rumah tua kakek pemain karakter utama, Pohon beringin, Kediaman Bagus Mangun, Kediaman Kyai Mranggi,",
        linkImage: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1483974217l/33824925._SX318_.jpg",
    },
    {
        id: 3,
        company: "Comic House Banyumas",
        title: "Soekarno",
        description: "Dalam komik Soekarno saya berperan sebagai background illustrator, yang membuat background dari 3D ataupun 2D. Proyek Batch 1 ini membutuhkan waktu sekitar 3 bulan kurang. Kurang lebih, model 3D yang saya kerjakan pada saat program Batch 1 ini antara lain, Sebagian Bangunan Pajajaran.",
        linkImage: "https://inc.mizanstore.com/aassets/img/com_cart/produk/SOEKARNO_SANG_GURU_BANGSA.jpg",
    },
]

export default function ProjectContent() {
  return (
    <CarouselProject items={items}/>
  )
}

