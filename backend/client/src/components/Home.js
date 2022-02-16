import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, GridItem, Heading, Text, Box, Image, Stack, Button } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import axios from 'axios'


const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <Grid
        h='100vh'
        templateRows='repeat(4, 1fr)'
        templateColumns='repeat(2, 1fr)'
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={2} bg='papayawhip'>
          <Box >
            <Image
              objectFit='cover'
              boxSize='50vh'
              src='https://res.cloudinary.com/dcnsstzif/image/upload/v1645042962/holiday_mates/Screenshot_2022-02-16_at_18.01.39_fuo0p2.png'
              alt='Holiday Mates logo'
            />
          </Box>

        </GridItem>

        {/* <GridItem rowSpan={2} colSpan={1} bg='papayawhip'></GridItem> */}

        <GridItem rowSpan={1} colSpan={2} >
          {/* <Box p={2} m={1} borderWidth='1px' shadow='md'> */}
          <Text fontSize='md'>Connect with your friends, brag or tag your holidays and explore the map for your next getaway.</Text>
          <Text fontSize='sm'>Just remember your shorts and sunscreen.</Text>
          <Button onClick={() => navigate('/register')}>Sign me up!</Button>
          {/* </Box> */}
        </GridItem>
        <GridItem colSpan={2}>

        </GridItem>
      </Grid>
    </div>
  )
}

export default Home