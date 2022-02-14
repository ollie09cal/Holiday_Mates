import React, { useState, useEffect } from 'react'
import ReactMapGl, { Marker, Layer } from 'react-map-gl'

import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../enviroment/env'
import 'mapbox-gl/dist/mapbox-gl.css'
const PracticeMap = () => {

  const [viewPort, setViewPort] = useState(null)
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(position => {
      // console.log(position.coords)
      const { latitude, longitude } = position.coords
      console.log('position', latitude, longitude)
      setViewPort({ latitude: latitude, longitude: longitude })
    })
  }, [])
  // const Map = ReactMapGl({ accessToken: REACT_APP_MAPBOX_ACCESS_TOKEN, attributionControl: false })
  
  const [isPopup, setIsPopup] = useState(null)
  
  return (
    <div className="map-container" >
      <h1>Practice Map</h1>
      {viewPort ?
        <ReactMapGl
          initialViewState={{ ...viewPort, zoom: 10 }}

          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
          <Marker longitude={viewPort.longitude} latitude={viewPort.latitude} color="green" />
        </ReactMapGl>
        :
        <p>loading your location</p>}
      
    </div>
  )
}

export default PracticeMap