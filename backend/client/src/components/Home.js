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
          <Heading as='h4' >Welcome to Holiday Mates</Heading>
          <Text fontSize='md'>Connect with your friends, brag or tag your holidays and explore the map for your next getaway.</Text>
          <Text fontSize='sm' align='center' as='mark'>Just remember your shorts and sunscreen.</Text>
          <Button onClick={() => navigate('/register')}>Sign me up!</Button>
        </GridItem>

        {/* <GridItem rowSpan={2} colSpan={1} bg='papayawhip'></GridItem> */}

        <GridItem rowSpan={1} colSpan={1} bg='papayawhip'>
          <Box p={2} m={1} borderWidth='1px' shadow='md'>
            <Stack spacing={2}>
              {/* create a vertical stack for profile image */}
              <Heading as='h3' size='md' isTruncated>
                Linda&apos;s trip to London
              </Heading>
              <Heading as='h4' size='sm' isTruncated>
                London, England, UK
              </Heading>
              <Heading as='h4' size='sm'>
                Author: linda2022
              </Heading>
              <Heading as='h4' size='xs'>
                We painted the town red and let me tell you I will never forget our last night in Shoreditch.
              </Heading>
              <Box display='flex' mt='2' alignItems='center'>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < 5 ? 'teal.500' : 'gray.300'}
                    />
                  ))
                }
              </Box>
              {/* <Image src='' alt={`image of London`} borderRadius={15} /> */}
            </Stack>

          </Box>
        </GridItem>
        <GridItem colSpan={2} bg='tomato'></GridItem>
      </Grid>
    </div>
  )
}

export default Home