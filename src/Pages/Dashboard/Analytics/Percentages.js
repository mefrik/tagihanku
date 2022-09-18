import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack, styled } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import OpacityIcon from '@mui/icons-material/Opacity';

const PercentagesStack = styled(Stack)(() => ({
  width: '100%',
}))

const PercentagesCard = styled(Card)(() => ({
  width: '100%',
  // margin: 5,
  height: '80%',
}))

const TitleStack = styled(Stack)(() => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}))
const MainStack = styled(Stack)(() => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
}))
const StackRight = styled(Stack)(() => ({
}))
const StackLeft = styled(Stack)(() => ({
}))

export default function Percentages() {
  return (
    <PercentagesStack spacing={2} direction='row' justifyContent="space-between">
      <PercentagesCard elevation={2}>
        <CardContent>
          <TitleStack>
            <Typography gutterBottom variant="h5" component="div">
              Electric
            </Typography>
            <FlashOnIcon fontSize='large' sx={{color: 'orange'}}/>
          </TitleStack>
          <MainStack>
            <StackLeft>
              {/* <Typography
                sx={{
                  fontSize: '20px',

                }}
              >
                tes
              </Typography> */}
            </StackLeft>
            <StackRight>
              <Typography
                sx={{
                  fontSize: '50px',
                }}
                color='primary'
              >
                23
              </Typography>
            </StackRight>
          </MainStack>
        </CardContent>
      </PercentagesCard>
      

      <PercentagesCard elevation={2}>
        <CardContent>
          <TitleStack>
            <Typography gutterBottom variant="h5" component="div">
              Health
            </Typography>
            <HealthAndSafetyIcon fontSize='large' sx={{color: 'red'}}/>
          </TitleStack>
          <MainStack>
            <StackLeft>
              {/* <Typography
                sx={{
                  fontSize: '20px',

                }}
              >
                tes
              </Typography> */}
            </StackLeft>
            <StackRight>
              <Typography
                sx={{
                  fontSize: '50px',
                }}
                color='primary'
              >
                23
              </Typography>
            </StackRight>
          </MainStack>
        </CardContent>
      </PercentagesCard>

      
      <PercentagesCard elevation={2}>
        <CardContent>
          <TitleStack>
            <Typography gutterBottom variant="h5" component="div">
              Internet
            </Typography>
            <WifiTetheringIcon fontSize='large' sx={{color: 'yellowgreen'}}/>
          </TitleStack>
          <MainStack>
            <StackLeft>
              {/* <Typography
                sx={{
                  fontSize: '20px',

                }}
              >
                tes
              </Typography> */}
            </StackLeft>
            <StackRight>
              <Typography
                sx={{
                  fontSize: '50px',
                }}
                color='primary'
              >
                23
              </Typography>
            </StackRight>
          </MainStack>
        </CardContent>
      </PercentagesCard>

      
      <PercentagesCard elevation={2}>
        <CardContent>
          <TitleStack>
            <Typography gutterBottom variant="h5" component="div">
              Tax
            </Typography>
            <ReceiptLongIcon fontSize='large' sx={{color: 'gray'}}/>
          </TitleStack>
          <MainStack>
            <StackLeft>
              {/* <Typography
                sx={{
                  fontSize: '20px',

                }}
              >
                tes
              </Typography> */}
            </StackLeft>
            <StackRight>
              <Typography
                sx={{
                  fontSize: '50px',
                }}
                color='primary'
              >
                23
              </Typography>
            </StackRight>
          </MainStack>
        </CardContent>
      </PercentagesCard>

      
      <PercentagesCard elevation={2}>
        <CardContent>
          <TitleStack>
            <Typography gutterBottom variant="h5" component="div">
              Water
            </Typography>
            <OpacityIcon fontSize='large' sx={{color: 'cyan'}}/>
          </TitleStack>
          <MainStack>
            <StackLeft>
              {/* <Typography
                sx={{
                  fontSize: '20px',

                }}
              >
                tes
              </Typography> */}
            </StackLeft>
            <StackRight>
              <Typography
                sx={{
                  fontSize: '50px',
                }}
                color='primary'
              >
                23
              </Typography>
            </StackRight>
          </MainStack>
        </CardContent>
      </PercentagesCard>
    </PercentagesStack>
  )
}


