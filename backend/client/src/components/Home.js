import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, GridItem, Heading, Text, Box, Image, Stack, Button, Center } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import axios from 'axios'

// #24A19C
const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <Grid
        h='100vh'
        templateRows='repeat(4, 1fr)'
        templateColumns='repeat(2, 1fr)'
        gap={4}
        bg='#FFBCBC'
      >
        <GridItem rowSpan={2} colSpan={2}>
          <div className='hero-container'>
            <Image
              objectFit='cover'
              boxSize='50vh'
              src='https://res.cloudinary.com/dcnsstzif/image/upload/v1645042962/holiday_mates/Screenshot_2022-02-16_at_18.01.39_fuo0p2.png'
              alt='Holiday Mates logo'
            />
          </div>

        </GridItem>

        {/* <GridItem rowSpan={2} colSpan={1} bg='papayawhip'></GridItem> */}

        <GridItem rowSpan={1} colSpan={2} >
          <Center><Box className='sign-up-container' p={2} m={1} borderWidth='1px' shadow='md' maxW='600px' borderRadius={10} margin={15} padding={7}>
            <Text
              fontSize='md'
              textAlign='center'
              fontWeight={600}
              mb={2}
            >Connect with your friends, brag or tag your holidays and explore the map for your next getaway.</Text>
            <Text fontSize='sm' textAlign='center'>Just remember your shorts and sunscreen.</Text>
            <Center>
              <Button
                className='sign-up-button'
                onClick={() => navigate('/register')}
                colorScheme="teal" marginTop={3}
                color='#EFEFEF'
                boxShadow='md'
              >
                Sign me up!
              </Button>
            </Center>
          </Box></Center>
        </GridItem>

        <GridItem colSpan={2}>

        </GridItem>
      </Grid>
    </div >
  )
}

export default Home