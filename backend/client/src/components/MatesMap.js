import React, { useEffect, useState } from 'react'
import {
  Heading,
  Text,
  Avatar,
  Image,
  AvatarGroup,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Center
} from '@chakra-ui/react'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
// import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../enviroment/env'
import mapboxgl from 'mapbox-gl'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useNavigate, } from 'react-router-dom'

mapboxgl.workerClass = MapboxWorker; 



const MatesMap = () => {

  const MatesOverlay = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px)'
    />
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<MatesOverlay />)

  const navigate = useNavigate()

  const holidaysFromMates = []

  const [currentLocation, setCurrentLocation] = useState(null)
  const [mates, setMates] = useState([])
  const [matesHolidays, setMatesHolidays] = useState([])
  const [userHolidays, setUserHolidays] = useState([])
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)
  const [showPopup, setShowPopup] = useState(null)
  const [viewPort, setViewPort] = useState({
    latitude: 51,
    longitude: -0.1,
    zoom: 1
  })

  //mates data
  const getMates = async () => {
    try {
      // const payload = getPayload()
      const token = window.localStorage.getItem('holiday-token')
      // const payload = 'hello'
      const { data } = await axios.get('api/mates', {
        headers: { Authorization: `Bearer ${token}` }
      })
      !data ? console.log('No mates') : setMates(data.mates)

    } catch (err) {
      console.log(err.message)
    }
  }

  const getUserAndHolidays = async () => {
    try {
      const token = window.localStorage.getItem('holiday-token')
      const { data } = await axios.get('api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(data)
      setUserHolidays(data.ownedHolidays)
    } catch (err) {
      console.log(err)
    }
  }

  //overall data
  const getData = async () => {
    try {
      const token = window.localStorage.getItem('holiday-token')
      const { data } = await axios.get('api/holidays', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  //current location
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setCurrentLocation({ latitude: latitude, longitude: longitude })
      setViewPort({ latitude: latitude, longitude: longitude })
    })

  }, [])

  useEffect(() => {
    getData()
    setOverlay(<MatesOverlay />)
    onOpen()
  }, [])

  //user and user holiday data
  useEffect(() => {
    getMates()
    getUserAndHolidays()
  }, [data])

  useEffect(() => {
    mates.length && mates.map(mate => holidaysFromMates.push(...mate.ownedHolidays))
    setMatesHolidays(holidaysFromMates)
  }, [mates])


  const handleClick = (e) => {
    const holidayId = e.currentTarget.id
    const holiday = data[data.findIndex(item => item._id === holidayId)]
    setShowPopup(holiday)
  }

  const closePopup = () => {
    setShowPopup(null)
  }


  return (
    <div className="mates-map-container">
      <Center><Heading className='web-only'>Mates Map</Heading></Center>
      <Center>
        <Modal size='xs' isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
          {overlay}
          <ModalContent top='150px'>
            <ModalHeader>Mates Map</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Here you can see all your friends and your holidays all together. Lovely.</Text>
              <AvatarGroup size='sm' max={5} mt={4} mb={4}>
                {mates.length ?
                  mates.map(mate => (
                    <Avatar key={mate._id} name={mate.username} showBorder src={mate.profilePhoto} />
                  ))
                  :
                  <Text>Looking a bit lonely...</Text>}
              </AvatarGroup>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Center>
      <div className='mates-map'>
        <ReactMapGl
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          {...viewPort}
          onMove={e => setViewPort(e.viewState)}
        >

          {userHolidays.map(holiday => {
            return < Marker key={holiday._id} latitude={holiday.latitude} longitude={holiday.longitude} >
              <div id={holiday._id} onClick={handleClick}>
                <Avatar src={holiday.image} name={holiday.title} showBorder size='sm' />
              </div>
            </Marker >
          })
          }
          {!!matesHolidays.length &&
            matesHolidays.map((holiday, index) => {
              return < Marker key={holiday.id + index} latitude={holiday.latitude} longitude={holiday.longitude} >
                <div id={holiday._id} onClick={handleClick}>
                  <Avatar src={holiday.image} name={holiday.title} showBorder size='sm' />
                </div>
              </Marker >
            })
          }

          {!!showPopup &&
            <div onClick={() => navigate(`/viewholiday/${showPopup._id}`)}>
              <Popup
                closeOnMove={false}
                closeOnClick={false}
                latitude={showPopup.latitude}
                longitude={showPopup.longitude}
                anchor='bottom'
                onClose={closePopup}
                className='popup'
              >
                <div className='popup-info'>
                  <Heading as='h3' size='sm'>{showPopup.title}</Heading>
                  <Text id='popup-location'>{showPopup.location}</Text>
                  <Image borderRadius={10} src={showPopup.image} alt={showPopup.title} m={2} />
                  <Text>{showPopup.description}</Text>
                </div>
              </Popup>
            </div>}
          {!!currentLocation &&
            <Marker
              className='current-location-marker'
              longitude={currentLocation.longitude}
              latitude={currentLocation.latitude}
              color='#FFBCBC' />
          }
        </ReactMapGl>
      </div>
    </div>
  )
}

export default MatesMap

