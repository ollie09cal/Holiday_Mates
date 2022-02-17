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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Center,
  Textarea
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
// import ReactMapGl, { Marker, Popup } from 'react-map-gl'
// import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../enviroment/env'
import { SmallAddIcon } from '@chakra-ui/icons'
import { ImageUpload } from '../components/subComponents/ImageUpload'
import { getTokenFromLocal, userAuth } from './../enviroment/helpers/auth'

const currentYear = new Date().getFullYear()

const AddHoliday = () => {
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const isLogged = userAuth()
    if (!isLogged) {
      navigate('/')
    }
  }, [])



  const [holidayInfo, setHolidayInfo] = useState({
    title: '', //max length 50
    location: '', //required
    longitude: 0, //input from this end
    latitude: 0, //input from this end
    date: '', //required month and year
    description: '', //max length of 500
    image: '' //required
  })
  const [holidayDate, setHolidayDate] = useState({
    month: '',
    year: '2022'
  })
  const [formError, setFormError] = useState({
    title: '',
    location: '',
    longitude: '',
    latitude: '',
    date: '',
    description: '',
    image: ''
  })
  const [searchValues, setSearchValues] = useState({
    search: ''
  })
  const [resultsOptions, setResultsOptions] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHolidayInfo({ ...holidayInfo, date: `${holidayDate.month} ${holidayDate.year}` })
    try {
      // setHolidayInfo({ ...holidayInfo, date: `${holidayDate.month} ${holidayDate.year}` })
      const token = getTokenFromLocal()
      const { data } = await axios.post('/api/holidays', holidayInfo, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data)
      toast({
        title: 'Holiday Added!',
        description: 'Now add some Holiday cards to complete the Trip!',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      await navigate(`/addholidaycard/${data._id}`)
      // console.log(holidayInfo)
    } catch (err) {
      console.log(err)
      setFormError({ ...formError, ...err.response.data.description })
      console.log(err.response.data.errors.description)
    }
  }

  const handleChange = (e) => {
    setFormError({ ...formError, [e.target.id]: '' })
    const newObj = { ...holidayInfo, [e.target.id]: e.target.value }
    setHolidayInfo(newObj)
  }
  const handleMonth = (e) => {
    setHolidayDate({ ...holidayDate, month: e.target.value })
    setHolidayInfo({ ...holidayInfo, date: `${holidayDate.month} ${holidayDate.year}` })
    console.log(holidayDate)
  }
  const handleYear = (e) => {
    setHolidayDate({ ...holidayDate, year: e })
    setHolidayInfo({ ...holidayInfo, date: `${holidayDate.month} ${holidayDate.year}` })
    console.log(holidayDate)
  }
  const handleImageURL = (url) => {
    setHolidayInfo({ ...holidayInfo, image: url })
  }
  const handleSearch = (e) => setSearchValues({ ...searchValues, [e.target.name]: e.target.value })

  const search = (e) => {
    const { center } = resultsOptions[resultsOptions.findIndex(result => result.place_name === e.target.innerText)]
    setHolidayInfo({ ...holidayInfo, longitude: center[0], latitude: center[1], location: e.target.innerText })
    console.log(holidayInfo)
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

  return (
    <div className="holiday-add-container">
      <Center>
        <Box p={3} m={2} borderWidth='1px' borderRadius={10} shadow='md' maxW="500px">
          <form onSubmit={handleSubmit}>

            <FormControl isRequired isInvalid={formError.title}>
              <FormLabel htmlFor='title'>Holiday Title</FormLabel>
              <Input
                id='title'
                type='text'
                placeholder='Marks trip to paradise!'
                defaultValue={holidayInfo.title}
                onChange={handleChange}
              />
              {formError.title && <FormErrorMessage>It&apos;s Not a Novel! Keep it short and sweet</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired isInvalid={formError.location}>
              <FormLabel htmlFor='location'>Location, Location, Location!</FormLabel>
              <Input
                placeholder='search'
                size='md'
                name='search'
                value={searchValues.search}
                onChange={handleSearch} />
              <Button mt={2} mb={3} onClick={searchSubmit}>search</Button>
              {!!resultsOptions.length &&
                <VStack spacing={4}>
                  {resultsOptions.map((option, i) => {
                    console.log(option)
                    return (
                      <Box h='40px' key={i} onClick={search} borderWidth='1px'>
                        <p>{option.place_name}</p>
                      </Box>
                    )
                  })}
                </VStack>
              }
              {formError.location && <FormErrorMessage>Invalid location (try chosing somewhere near)</FormErrorMessage>}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='date'>Tell us the month and year of your trip!</FormLabel>
              <HStack>
                <Select id='month' isRequired placeholder='Pick a Month' onChange={handleMonth}>
                  <option value="January">January</option>
                  <option value="Febuary">Febuary</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </Select>
                <NumberInput id='year' defaultValue={currentYear} min={1990} max={currentYear} onChange={handleYear}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
              {formError.date && <FormErrorMessage>Invalid date, try another time!</FormErrorMessage>}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="description">Give us a short Description</FormLabel>
              <Textarea placeholder='Give us a short description of ya trip!'/>
              {formError.description && <FormErrorMessage>try keeping the text below 500 characters! we dont want your life story</FormErrorMessage>}
            </FormControl>
            <FormControl>
              <Box boxSize='100%'>
                <ImageUpload value={holidayInfo.image} name="image" handleImageURL={handleImageURL} />
              </Box>
            </FormControl>

            <Button
              type='submit'
              rightIcon={<SmallAddIcon />}
              mt={2}
              onSubmit={() => {
                handleSubmit()
              }}>Create Holiday</Button>
          </form>
        </Box>
      </Center>
    </div>
  )
}

export default AddHoliday