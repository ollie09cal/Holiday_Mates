import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  VStack,
  HStack,
  Select,
  useToast,
  Stack,
  Spinner,
  Image,
  Heading,
  Center,
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
import CreatableSelect from 'react-select/creatable'
import { ActionMeta, OnChangeValue } from 'react-select'
import { SmallAddIcon, StarIcon } from '@chakra-ui/icons'
import { ImageUpload } from '../components/subComponents/ImageUpload'
import { getTokenFromLocal, userAuth } from './../enviroment/helpers/auth'

const AddHolidayCard = () => {
  const [holidayId, setHolidayId] = useState() //what does this do?
  const [holiday, setHoliday] = useState([])
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const toast = useToast()
  const token = getTokenFromLocal()
  const { isOpen, onOpen, onClose } = useDisclosure()
  let vibes = []
  const [cardUpdated, setCardUpdated] = useState(false)
  const navigate = useNavigate()
  const id = useParams()
  //console.log(id.holidayid)

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
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getHoliday()
    setCardUpdated(false)
  }, [cardUpdated])

  //holiday card form popup
  const [holidayCardInfo, setHolidayCardInfo] = useState({
    type: '', //required, dropdown
    location: '', //required
    longitude: 0, //input from this end
    latitude: 0, //input from this end
    link: '', //not required
    photo: '', //not required
    description: '', //max length of 500 required
    vibeTag: [], //not required
    rating: 5 //required
  })
  const [formError, setFormError] = useState({
    type: '',
    location: '',
    link: '',
    photo: '',
    description: '',
    vibeTag: '',
    rating: ''
  })
  const [searchValues, setSearchValues] = useState({
    search: ''
  })
  const [resultsOptions, setResultsOptions] = useState([])

  const handleChange = (e) => {
    setFormError({ ...formError, [e.target.id]: '' })
    const newObj = { ...holidayCardInfo, [e.target.id]: e.target.value }
    setHolidayCardInfo(newObj)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // vibes.forEach(vibe => {holidayCardInfo.vibeTag.push(vibe)})
    setHolidayCardInfo({ ...holidayCardInfo, vibeTag: vibes })
    try {
      const { data } = await axios.post(`/api/holidays/${id.holidayid}`, holidayCardInfo, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast({
        title: 'Holiday Card Added!',
        description: 'Feel free to add some more holiday cards!',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      onClose()
      setCardUpdated(true)
    } catch (err) {
      setFormError({ ...formError, ...err.response.data.errors })
    }
  }

  const handleSearch = (e) => setSearchValues({ ...searchValues, [e.target.name]: e.target.value })
  const search = (e) => {
    const { center } = resultsOptions[resultsOptions.findIndex(result => result.place_name === e.target.innerText)]
    setHolidayCardInfo({ ...holidayCardInfo, longitude: center[0], latitude: center[1], location: e.target.innerText })
    setSearchValues({ search: e.target.innerText })
    setResultsOptions([])
  }
  const searchSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValues.search}.json?access_token=pk.eyJ1IjoianZpY2tlcnMiLCJhIjoiY2t6bGFuZTNoMHl3MDJza2Vvd2U2Mm84cSJ9.nYy2TJv3ChiUdpl4CLtYJA`)
      const results = data.features
      setResultsOptions(results)
    } catch (err) {
      console.log(err)
    }
  }

  const handleMultiChange = (e) => {
    vibes = []
    e.forEach(vibe => {
      vibes.push(vibe.label)
    })
    setHolidayCardInfo({ ...holidayCardInfo, vibeTag: vibes })
  }

  const handleRating = (e) => {
    setHolidayCardInfo({ ...holidayCardInfo, rating: e })
  }

  const handleImageURL = (url) => {
    setHolidayCardInfo({ ...holidayCardInfo, image: url })
  }
  const deleteCard = async (e) => {
    try {
      const { data } = await axios.delete(`/api/holidaytypes/${e.target.value}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast({
        title: 'Holiday Card Deleted!',
        description: 'The Holiday Card has now been removed from your collection',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      setCardUpdated(true)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="holidaytype-input-container">
      {holiday.owner ?
        <div className="holidayCard">
          {/* Holiday card header box */}
          <Center>
            <Box bg="#ffffff" p={5} m={5} borderWidth='1px' shadow='md' w='100%' maxW="500px">
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
                <Image src={holiday.image} alt={`image of ${holiday.location}`} borderRadius={15} />
              </Stack>
            </Box>
          </Center>

          {holiday.holidayTypes.length ?
            holiday.holidayTypes.map((holidayCard, i) => {
              return (

                <Center key={i}>
                  <Box maxW="800px" p={3} m={2} bg="#ffffff" borderWidth='1px' borderRadius={10} shadow='md' key={i}>
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
                    <Button mt={3} value={holidayCard._id} onClick={deleteCard} colorScheme='red'>Delete</Button>
                  </Box>
                </Center>
              )
            })
            :
            <Center>
              <Heading as='h3' size='l' mb={4} mt={4}>Tell us what you got up to on holiday...</Heading>
            </Center>

          }

          <div className="add-holiday-card">
            <Center>
              <Button position='center' spacing={3} shadow='md' onClick={onOpen}>➕</Button>
            </Center>
            <Modal bg="#ffffff" isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Holiday Card Creation</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                  <ModalBody>
                    <FormControl isRequired isInvalid={formError.type}>
                      <FormLabel htmlFor='type'>Type of your activity:</FormLabel>
                      <Select id='type' isRequired placeholder='Pick a Type' onChange={handleChange}>
                        <option value="Resturant">Resturant</option>
                        <option value="Landmark">Landmark</option>
                        <option value="Secret-Place">Secret Place</option>
                        <option value="Walk">Walk</option>
                        <option value="Bar">Bar</option>
                        <option value="Activity">Activity</option>
                        <option value="Stay">Stay</option>
                        <option value="Event">Event</option>
                      </Select>
                    </FormControl>

                    <FormControl isRequired isInvalid={formError.location}>
                      <FormLabel htmlFor='location'>Location, Location, Location!</FormLabel>
                      <Input
                        placeholder='Search'
                        size='md'
                        name='search'
                        value={searchValues.search}
                        onChange={handleSearch} />
                      <Button mt={2} onClick={searchSubmit}>Search</Button>
                      {!!resultsOptions.length &&
                        <VStack spacing={4}>
                          {resultsOptions.map((option, i) => {
                            console.log(option)
                            return (
                              <Box h='40px' key={i} onClick={search}>
                                <p>{option.place_name}</p>
                                <Divider orientation='horizontal' />
                              </Box>
                            )
                          })}
                        </VStack>
                      }
                      {formError.location && <FormErrorMessage>Invalid location (try chosing somewhere near)</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={formError.link}>
                      <FormLabel htmlFor='link'>Add a Related Link...</FormLabel>
                      <Input
                        id='link'
                        type='url'
                        placeholder='www.holiday.com'
                        defaultValue={holidayCardInfo.link}
                        onChange={handleChange} />
                      {formError.link && <FormErrorMessage>Invalid Link!</FormErrorMessage>}
                    </FormControl>

                    <FormControl isRequired isInvalid={formError.description}>
                      <FormLabel htmlFor='description'>Add a short description...</FormLabel>
                      <Input
                        id='description'
                        type='text'
                        placeholder='Give us a short description of your activity'
                        defaultValue={holidayCardInfo.description}
                        onChange={handleChange}
                      />
                      {formError.description && <FormErrorMessage>try keeping the text below 500 characters! we dont want your life story</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={formError.vibeTag}>
                      <FormLabel htmlFor='vibeTag'>Add some vibes...</FormLabel>
                      <CreatableSelect
                        id='vibeTag'
                        isMulti
                        onChange={handleMultiChange}
                      />
                    </FormControl>

                    <FormControl isRequired isInvalid={formError.description}>
                      <FormLabel htmlFor='rating'>Rate from out of 5...</FormLabel>
                      <NumberInput defaultValue={5} min={1} max={5} onChange={handleRating}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl>
                      <ImageUpload value={holidayCardInfo.photo} name="photo" handleImageURL={handleImageURL} />
                    </FormControl>

                    {/* <ModalFooter> */}
                    <Button type='submit' colorScheme='blue' mr={3} onSubmit={() => {
                      handleSubmit()
                    }}>
                      Add Card!
                    </Button>
                    {/* </ModalFooter> */}
                  </ModalBody>
                </form>
              </ModalContent>
            </Modal>
          </div>
        </div>
        :
        <Center>
          <Spinner margin={5} />
        </Center>

      }
    </div >
  )
}

export default AddHolidayCard