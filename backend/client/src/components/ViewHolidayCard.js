import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactMapGl, { Marker } from 'react-map-gl'
import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../enviroment/env'
import { useNavigate } from 'react-router-dom'
import { Box, Spinner, Stack, Heading, Image, HStack, Tag, Button, Center } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { getTokenFromLocal, userAuth } from './../enviroment/helpers/auth'
import { StarIcon } from '@chakra-ui/icons'

const ViewHolidayCard = () => {
  const [holidayCard, setHolidayCard] = useState([])
  const [holidayCardId, setHolidayCardId] = useState()
  const token = getTokenFromLocal()
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const navigate = useNavigate()

  //setholidaycardId to be whatever gets passed to
  const id = useParams()

  useEffect(() => {
    const isLogged = userAuth()
    if (!isLogged) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    const getHolidayCard = async () => {
      try {
        const { data } = await axios.get(`/api/holidaytypes/${id.holidaycardid}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setHolidayCard(data)
      } catch (err) {
        setHasError({ error: true, message: '' })
      }
    }
    getHolidayCard()
  }, [holidayCardId])

  return (
    <div className="holiday-card-container">
      {holidayCard.owner ?
        <Center>
          <Box p={5} m={2} borderWidth='1px' shadow='md' maxWidth='500px'>
            <Stack spacing={2}>
              {/* create a vertical stack for profile image */}
              <Heading as='h2' size='xl' isTruncated>
                {holidayCard.type}
              </Heading>
              <Heading as='h3' size='l'>
                Author: {holidayCard.owner.username}
              </Heading>
              <Box display='flex' mt='2' alignItems='center'>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < holidayCard.rating ? 'teal.500' : 'gray.300'}
                    />
                  ))
                }
              </Box>
              {holidayCard.link.length && <Button colorScheme='blue' onClick={() => { window.location.href = holidayCard.link }} >Related Link</Button>}
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
              <Heading as='h3' size='l' isTruncated>
                📍 {holidayCard.location}
              </Heading>
              <Box width="100%" height={32}>
                <ReactMapGl
                  mapboxAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
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
                    <Image src={photo} alt={`image of ${holidayCard.location}`} key={i} boxSize='l' />
                  )
                })
                }
              </Box>
            </Stack>
          </Box>
        </Center>
        :
        <Spinner />
      }
    </div>
  )
}

export default ViewHolidayCard