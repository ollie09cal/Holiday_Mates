import React, { useState } from 'react'
import ReactMapGl, { Marker, Layer } from 'react-mapbox-gl'
import mapboxgl from 'mapbox-gl'
import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../enviroment/env'
const PracticeMap = () => {

  const Map = ReactMapGl({ accessToken: REACT_APP_MAPBOX_ACCESS_TOKEN, attributionControl: false })

  const [isPopup, setIsPopup] = useState(null)
  
  return (
    <div className="practice-map-container" >
      <h1>Practice Map</h1>
      <Map
        height='100%'
        width='100%'
        style='mapbox://styles/mapbox/streets-v11'
        zoom= {[11]}
        center= {[ -0.0541846, 51.5399592]}
			>
        {/* <Marker  coordinates={[-0.0541846, 51.5399592]}><span>🎈</span></Marker> */}
      </Map>
    </div>
  )
}

export default PracticeMap