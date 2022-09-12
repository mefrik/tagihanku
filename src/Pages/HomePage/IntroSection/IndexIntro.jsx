import { Grid, Stack, styled } from '@mui/material'
import React, { Suspense } from 'react'
import PrimaryButton from '../../../Components/Button/HireMeButton'
import SecondaryButton from '../../../Components/Button/MyPortoButton'
import Name from './Name'
import Quotes from './Quotes'
import IntroTitle from './IntroTitle'
import SocialMediaIntro from './SocialMediaIntro'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Fade from 'react-reveal/Fade'
import { YuraikoModel } from '../../../Assets/3DModels/YuraikoModel'

const CustomizeStackName = styled(Stack)(() => ({

}))

const CustomizeStackTitle = styled(Stack)(() => ({

}))

const CustomizeStackButton = styled(Stack)(() => ({
  
}))

const CustomizeStackQuotes = styled(Stack)(() => ({

}))

const CustomizeGridImage = styled(Grid)(() => ({
  display: "flex",
  flex: 1,
}))

export default function IndexIntro() {
  return (
    <Fade timeout={5000}>
      <Grid
        sx={{
          height: 'auto',
          bgcolor: 'transaprant',
          justifyContent: "center",
          alignItems: 'center',
        }}
        container
        spacing={2}
      >
        <Grid item mt={10}>
            <CustomizeStackName spacing={6} mb={2}>
              <Fade timeout={2000}>
                <Name/>
              </Fade>
              <Fade bottom delay={300}>
                <CustomizeStackTitle>
                  <IntroTitle/>
                </CustomizeStackTitle>
              </Fade>
            </CustomizeStackName>
            <CustomizeStackButton direction="row" spacing={2} mb={2}>
              <Fade bottom delay={600}>
                <PrimaryButton/>
              </Fade>
              <Fade top delay={900}>
                <SecondaryButton/>
              </Fade>
            </CustomizeStackButton>
            <CustomizeStackQuotes mb={2}>
              <Quotes/>
            </CustomizeStackQuotes>
          <SocialMediaIntro/>
        </Grid>
        <CustomizeGridImage item>
          <Canvas
            camera={{ position: [0, 0, 100], fov: 10 }}
            style={{
                height: '500px',
                width: '100%',
            }}
          >
            <ambientLight intensity={1.25} />
            <ambientLight intensity={0.1} />
            <directionalLight intensity={0.4} />
            <Suspense fallback={null}>
              <YuraikoModel position={[0, 0, 0]}/>
              {/* Z Y X */}
            </Suspense>
            <OrbitControls
              enableZoom={true}
              autoRotate={false}
              minPolarAngle ={1.5}
              maxPolarAngle ={0}
            />
          </Canvas>
        </CustomizeGridImage>
      </Grid>
    </Fade>
  )
}
