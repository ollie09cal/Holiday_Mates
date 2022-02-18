import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
  Box,
  Spinner,
  Stack,
  Heading,
  Image,
  HStack,
  VStack,
  Button,
  useToast,
  Center,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Tag
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getTokenFromLocal, userAuth } from './../enviroment/helpers/auth'

const ViewHoliday = () => {

  const [holiday, setHoliday] = useState([])
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()
  const [profileData, setProfileData] = useState(null)
  const token = getTokenFromLocal()
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const navigate = useNavigate()
  const id = useParams()
  const toast = useToast()

  useEffect(() => {
    const isLogged = userAuth()
    if (!isLogged) {
      navigate('/')
    }
  }, [])

  const getProfile = async () => {
    try {
      const token = window.localStorage.getItem('holiday-token')
      const { data } = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProfileData(data)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteHoliday = async () => {
    try {
      const { data } = await axios.delete(`/api/holidays/${holiday._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast({
        title: 'Holiday Deleted!',
        description: 'The Holiday Card has now been removed from your collection',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      navigate('/profile')
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    const getHoliday = async () => {
      try {
        const { data } = await axios.get(`/api/holidays/${id.holidayid}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setHoliday(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getHoliday()
    getProfile()
  }, [])


  return (
    <div className="holiday-container">
      {holiday.owner && profileData ?
        <div className="holidayCards">
          <Center>
            {/* Holiday card header box */}
            <Box bg='#ffffff' p={5} m={2} borderWidth='1px' shadow='md' maxWidth='500px' width="90%">
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
                {(profileData.id === holiday.owner.id) &&
                  <>
                    <Button
                      colorScheme='red'
                      onClick={() => setIsOpen(true)}>
                      Delete Holiday
                    </Button>
                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Holiday
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure? You cannot undo this action afterwards.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button colorScheme='red' onClick={onClose, deleteHoliday} ml={3}>
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </>
                }
              </Stack>
            </Box>
          </Center>
          {
            //holiday card boxes
            holiday.holidayTypes ?
              holiday.holidayTypes.map((holidayCard, i) => {
                return (
                  <Link to={`/viewholidaycard/${holidayCard._id}`} key={i}>
                    <Center>
                      <Box bg='#ffffff' p={3} m={2} borderWidth='1px' borderRadius={10} shadow='md' maxWidth='500px' width='100%' key={i}>
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
                              <Center key={i}>
                                <Image mt={3} borderRadius={5} src={photo} alt={`image of ${holidayCard.location}`} key={i} boxSize='150px' />
                              </Center>
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
                    </Center>
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
    </div >
  )
}

export default ViewHoliday