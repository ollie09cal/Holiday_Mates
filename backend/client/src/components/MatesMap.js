import React, { useEffect, useState } from 'react'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../enviroment/env'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useNavigate } from 'react-router-dom'


import { Heading, Text, Avatar, Image } from '@chakra-ui/react'

const MatesMap = () => {

  const navigate = useNavigate()

  const [currentLocation, setCurrentLocation] = useState(null)
  const [data, setData] = useState([])
  const [user, setUser] = useState(null)
  const [showPopup, setShowPopup] = useState(null)
  const [viewPort, setViewPort] = useState({
    latitude: 51,
    longitude: -0.1,
    zoom: 1
  })

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setCurrentLocation({ latitude: latitude, longitude: longitude })
      setViewPort({ latitude: latitude, longitude: longitude })
    })
    getMatesHolidays()
  }, [])

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

  const getMatesHolidays = async () => {
    try {
      // const payload = getPayload()
      const token = window.localStorage.getItem('holiday-token')
      // const payload = 'hello'
      const { data } = await axios.get('api/mates', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(data.mates)
    } catch (err) {
      console.log(err.message)
    }
  }
  const handleClick = (e) => {
    const holidayId = e.currentTarget.id
    const holiday = data[data.findIndex(item => item._id === holidayId)]
    console.log(holiday)
    setShowPopup(holiday)
  }

  const closePopup = () => {
    console.log('close')
    setShowPopup(null)
  }

  return (
    <div className="mates-map-container">
      <Heading>Mates</Heading>
      <Text>Here you can see all your friends and your holidays all together. Lovely.</Text>
      <div className='mates-map'>
        <ReactMapGl
          mapboxAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          {...viewPort}
          onMove={e => setViewPort(e.viewState)}
        >
          {!!data.length && ///data.mates
            data.map(mate => (
              mate.ownedHolidays.map(holiday => (
                <Marker key={holiday._id} latitude={holiday.latitude} longitude={holiday.longitude} >
                  <div id={holiday._id} onClick={handleClick}>
                    <Avatar src={holiday.image} name={holiday.title} showBorder size='sm' />
                  </div>
                </Marker>
              ))
            ))
          }
          {!!showPopup &&
            <div onClick={() => navigate(`/viewholiday/${showPopup._id}`)}>
              <Popup closeOnMove={false} closeOnClick={false} latitude={showPopup.latitude} longitude={showPopup.longitude} anchor='bottom' onClose={closePopup}>
                <Heading as='h3' size='sm'>{showPopup.title}</Heading>
                <Text>{showPopup.location}</Text>
                <Image src={showPopup.image} alt={showPopup.title} />
                <Text>{showPopup.description}</Text>
              </Popup>
            </div>}
          {!!currentLocation &&
            <Marker className='current-location-marker' longitude={currentLocation.longitude} latitude={currentLocation.latitude} color="green" />
          }
        </ReactMapGl>
      </div>
    </div>
  )
}

export default MatesMap