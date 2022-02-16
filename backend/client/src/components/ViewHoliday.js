import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Box, Spinner, Stack, Heading, Skeleton, Image, HStack, Tag } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getTokenFromLocal, userAuth } from './../enviroment/helpers/auth'

const ViewHoliday = () => {

  const [holiday, setHoliday] = useState([])
  const [holidayId, setHolidayId] = useState()
  const token = getTokenFromLocal()
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const navigate = useNavigate()
  const id = useParams()

  useEffect(() => {
    const isLogged = userAuth()
    if (!isLogged) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    const getHoliday = async () => {
      try {
        const { data } = await axios.get(`/api/holidays/${id.holidayid}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setHoliday(data)
        console.log(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getHoliday()
  }, [holidayId])

  return (
    <div className="holiday-container">
      {holiday.owner ?
        <div className="holidayCards">
          {/* Holiday card header box */}
          <Box p={5} m={2} borderWidth='1px' shadow='md'>
            <Stack spacing={2}>
              {/* create a vertical stack for profile image */}
              <Heading as='h2' size='xl' isTruncated>
                {holiday.title}
              </Heading>
              <Heading as='h3' size='lg' isTruncated>
                {holiday.location}
              </Heading>
              <Heading as='h3' size='l'>
                Author: {holiday.owner.username}
              </Heading>
              <Heading as='h3' size='l'>
                {holiday.description}
              </Heading>
              <Box display='flex' mt='2' alignItems='center'>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < holiday.avgRating ? 'teal.500' : 'gray.300'}
                    />
                  ))
                }
              </Box>
              <Image src={holiday.image} alt={`image of ${holiday.location}`} borderRadius={15} />

            </Stack>

          </Box>

          {
            //holiday card boxes
            holiday.holidayTypes ?
              holiday.holidayTypes.map((holidayCard, i) => {
                return (
                  <Link to={`/viewholidaycard/${holidayCard._id}`} key={i}>
                    <Box p={3} m={2} borderWidth='1px' borderRadius={10} shadow='md' key={i}>
                      <Heading as='h3' size='xl'>
                        {holidayCard.type}
                      </Heading>
                      <Heading as='h4' size='l'>
                        📍 {holidayCard.location}
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
                      <Heading as='h4' size='m'>
                        {holidayCard.description}
                      </Heading>
                      <Box>
                        {holidayCard.photo && holidayCard.photo.map((photo, i) => {
                          return (
                            <Image src={photo} alt={`image of ${holidayCard.location}`} key={i} boxSize='150px' />
                          )
                        })
                        }
                      </Box>
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
                    </Box>
                  </Link>
                )
              })
              :
              <Spinner />
          }

        </div>
        :
        <Spinner />
      }
    </div>
  )
}

export default ViewHoliday