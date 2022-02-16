import React, { useState, useEffect } from 'react'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../enviroment/env'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Avatar, Spinner, Image, useDisclosure, Input, Button, Text, FormControl, Select, FormLabel, Box, VStack, Menu, Modal, ModalFooter, ModalBody, ModalHeader, ModalOverlay, ModalContent, ModalCloseButton, Heading, Checkbox, HStack } from '@chakra-ui/react'
import { getTokenFromLocal } from '../enviroment/helpers/auth'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const navigate = useNavigate()

  //STATE
  const [viewPort, setViewPort] = useState({
    latitude: 10,
    longitude: -0.1,
    zoom: 1
  })
  const [searchValues, setSearchValues] = useState({
    search: '',
    searchByHolidayType: false,
    holidayType: '',
    showPuplicHolidays: true,
    showMyHolidays: true,
  })
  const [currentLocation, setCurrentLocation] = useState(null)
  const [resultsOptions, setResultsOptions] = useState([])
  const [data, setData] = useState([])
  const [holidayTypeSearch, setHolidayTypeSearch] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  const [showPopup, setShowPopup] = useState(null)
  const [user, setUser] = useState(null)

  //get user
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = window.localStorage.getItem('holiday-token')
        const { data } = await axios.get('api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [])


  //get current location
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setCurrentLocation({ latitude: latitude, longitude: longitude })
      setViewPort({ latitude: latitude, longitude: longitude })
    })
    getMatesHolidays()
  }, [])

  const getMatesHolidays = async () => {
    try {
      const token = window.localStorage.getItem('holiday-token')
      const { data } = await axios.get('api/holidays', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(data)
    } catch (err) {
      console.log(err.message)
    }
  }
  //search and filter functions
  const handleChange = (e) => setSearchValues({ ...searchValues, [e.target.name]: e.target.value })

  useEffect(() => {
    if (searchValues.search) {
      const getResultsOptions = async () => {
        try {
          const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValues.search}.json?access_token=pk.eyJ1IjoianZpY2tlcnMiLCJhIjoiY2t6bGFuZTNoMHl3MDJza2Vvd2U2Mm84cSJ9.nYy2TJv3ChiUdpl4CLtYJA`)
          const results = data.features
          setResultsOptions(results)
        } catch (err) {
          console.log(err)
        }
      }
      console.log('searching')
      getResultsOptions()
    } else {
      setResultsOptions([])
    }
  }, [searchValues.search])

  const search = (e) => {
    const { center } = resultsOptions[resultsOptions.findIndex(result => result.place_name === e.target.innerText)]
    setViewPort({ latitude: center[1], longitude: center[0], zoom: 3 })
    setResultsOptions([])
    setSearchValues({...searchValues, search: '' })
  }
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleCheckbox = (e) => {
    e.preventDefault()
    setSearchValues({ ...searchValues, [e.target.name]: e.target.checked })
  }

  const handleClick = (e) => {
    const holidayId = e.currentTarget.id
    let holiday
    searchValues.searchByHolidayType ?
      holiday = filteredData[filteredData.findIndex(item => item._id === holidayId)]
      : holiday = data[data.findIndex(item => item._id === holidayId)]
    setShowPopup(holiday)
  }

  const closePopup = () => {
    setShowPopup(null)
  }
  //filter Results

  const getHolidayTypesData = async (holidayType) => {
    try {
      const token = getTokenFromLocal()
      const { data } = await axios.get('api/holidayTypes', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (holidayType) {
        const filterData = data.filter(holiday => holiday.type === holidayType)
        setFilteredData(filterData)
        console.log(filterData)
      } else {
        setFilteredData(data)
      }

      return data
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const { showPuplicHolidays, showMyHolidays, searchByHolidayType, holidayType } = searchValues

    if (!showPuplicHolidays) {
      const filterResults = data.filter(holiday => holiday.owner._id === user._id)
      setFilteredData(filterResults)
    }
    if (!showMyHolidays) {
      const filterResults = data.filter(holiday => holiday.owner._id !== user._id)
      setFilteredData(filterResults)
    }
    if (!showPuplicHolidays && !showMyHolidays) {
      setFilteredData(['noResults'])
    }
    if (showPuplicHolidays && showMyHolidays) {
      setFilteredData([])
    }
    (searchByHolidayType) ? setHolidayTypeSearch(true) : setHolidayTypeSearch(false)

    if (searchByHolidayType) {
      getHolidayTypesData(holidayType)
    }

  }, [searchValues])

  const goToHoliday = () => {
    searchValues.searchByHolidayType ?
      navigate(`/viewholidaycard/${showPopup._id}`)
      :
      navigate(`/viewholiday/${showPopup._id}`)

  }

  return (
    <>
      <Heading>Search</Heading>
      <Box>
        <form>
          <HStack>
            <Input placeholder='Search' size='md' name='search' value={searchValues.search} onChange={handleChange} />
            <Menu>
              <Button onClick={onOpen}>Filters</Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Filters</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <form>
                      <Checkbox name='searchByHolidayType' onChange={handleCheckbox}>Search By Holiday Type</Checkbox>
                      {!!holidayTypeSearch &&
                        <FormControl>
                          <FormLabel htmlFor='holiday-type'>Holiday Type</FormLabel>
                          <Select id='holiday-type' name='holidayType' onChange={handleChange}>
                            <option defaultValue value='' >All</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Landmark">Landmark</option>
                            <option value="Secret-Place">Secret Place</option>
                            <option value="Walk">Walk</option>
                            <option value="Bar">Bar</option>
                            <option value="Activity">Activity</option>
                            <option value="Stay">Stay</option>
                            <option value="Event">Event</option>
                          </Select>
                        </FormControl>
                      }

                      <Checkbox defaultIsChecked name='showPuplicHolidays' onChange={handleCheckbox}>Show Public Holidays</Checkbox>
                      <Checkbox defaultIsChecked name='showMyHolidays' onChange={handleCheckbox}>Show My Holidays</Checkbox>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                  </ModalFooter>
                </ModalContent>

              </Modal>
            </Menu>
          </HStack>
          

          {!!resultsOptions.length &&
            <VStack spacing={4} position='absolute' zIndex={1} bg='white' width='100%'>
              {resultsOptions.map((option, i) => {
                console.log(option)
                return (
                  <Box h='40px' key={i} onClick={search}>
                    <p>{option.place_name}</p>
                  </Box>
                )
              })}
            </VStack>
          }
        </form>
      </Box>
      <div className="map-container" >
        {viewPort ?
          <ReactMapGl
            // initialViewState={{ ...viewPort, zoom: 10 }}
            {...viewPort}
            onMove={e => setViewPort(e.viewState)}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
          >
            {!!data.length & filteredData[0] !== 'noResults' &&
              (filteredData.length ? filteredData : data).map((holiday) => (
                <Marker key={holiday._id} latitude={holiday.latitude} longitude={holiday.longitude} >
                  <div id={holiday._id} onClick={handleClick} >
                    <Avatar src={(holiday.image) ? holiday.image : holiday.photo} name={holiday.title} showBorder size='sm' />
                  </div>
                </Marker>
              ))}

            {!!showPopup &&
              <div onClick={goToHoliday}>
                <Popup closeOnMove={false} closeOnClick={false} latitude={showPopup.latitude} longitude={showPopup.longitude} anchor='bottom' onClose={closePopup}>
                  <Heading as='h3' size='sm'>{showPopup.title}</Heading>
                  <Text>{showPopup.location}</Text>
                  <Image src={(showPopup.image) ? showPopup.image : showPopup.photo} alt={showPopup.title} />
                  <Text>{showPopup.description}</Text>
                </Popup>
              </div>
            }
            {!!currentLocation &&
              <Marker className='current-location-marker' longitude={currentLocation.longitude} latitude={currentLocation.latitude} color="green" />
            }
          </ReactMapGl>
          :
          <Spinner />}

      </div>
    </>

  )
}

export default Search