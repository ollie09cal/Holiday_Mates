import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactMapGl, { Marker } from 'react-map-gl'
import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../enviroment/env'

import { Box, Spinner, Stack, Heading, Image, HStack, Tag } from '@chakra-ui/react'

const ViewHolidayCard = () => {
  const [holidayCard, setHolidayCard] = useState([])
  const [holidayCardId, setHolidayCardId] = useState()

  const [hasError, setHasError] = useState({ error: false, message: '' })
  
  //setholidaycardId to be whatever gets passed to
  
  useEffect(() => {
    setHolidayCardId('620a36b9a2e01d28c0440099')
    console.log('set holiday card id to ---->', holidayCardId)
  }, [])
  
  

  useEffect(() => {
    const getHolidayCard = async () => {
      try {
        const { data } = await axios.get(`/api/holidaytypes/${holidayCardId}`)
        setHolidayCard(data)
        console.log(holidayCardId)
        console.log(data)
      } catch (err) {
        setHasError({ error: true, message: ''})
        console.log(err)
      }
    }
    getHolidayCard()
  }, [holidayCardId])

  return (
    <div className="holiday-card-container">
      {holidayCard.owner ?
        <Box p={5} m={2} borderWidth='1px' shadow='md'>
          <Stack spacing={2}>
              {/* create a vertical stack for profile image */}
              <Heading as='h2' size='xl' isTruncated>
                {holidayCard.type}
              </Heading>
              <Heading as='h3' size='l'>
                Author: {holidayCard.owner.username}
              </Heading>
              <Box p={3} m={3} borderWidth='1px' shadow='md'>
                <HStack spacing={4}>
                  {holidayCard.vibeTag.map((vibe, i) => {
                    return (
                      <Tag size='md' key={i} variant='solid' colorScheme='green'>
                        {vibe}
                      </Tag>
                    )
                  })
                  }
                </HStack>
              </Box>
              <Heading as='h3' size='lg' isTruncated>
                📍 {holidayCard.location}
              </Heading>
              <Box width="100%" height={32}>
                <ReactMapGl
                mapboxAccessToken={ REACT_APP_MAPBOX_ACCESS_TOKEN }
                height='100%'
                width='100%'
                mapStyle="mapbox://styles/mapbox/streets-v9"
                zoom={14}
                latitude={holidayCard.latitude}
                longitude={holidayCard.longitude}
                >
                  <Marker color='red' key={holidayCard.location} latitude={holidayCard.latitude} longitude={holidayCard.longitude} />
                </ReactMapGl>
              </Box>
              <Heading as='h3' size='l'>
                {holidayCard.description}
              </Heading>
              <Box>
                {holidayCard.photo && holidayCard.photo.map((photo, i) => {
                  return (
                    <Image src={photo} alt={`image of ${holidayCard.location}`} key={i} boxSize='l'/>
                  )
                })
                }
              </Box>
          </Stack>
        </Box>
        :
        <Spinner />
      }
    </div>
  )
}

export default ViewHolidayCard