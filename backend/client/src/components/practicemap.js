import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../enviroment/env'
const PracticeMap = () => {

  //const Map = ReactMapGl({ accessToken: REACT_APP_MAPBOX_ACCESS_TOKEN, attributionControl: false })

  const [isPopup, setIsPopup] = useState(null)

  // const [viewPort, setViewPort] = useState({
  //   latitude: 51.515,
  //   longitude: -0.078,
  //   zoom: 4
  // })

  // useEffect(() => {
  //   window.navigator.geolocation.getCurrentPosition(position => {
  //     const { latitude, longitude } = position.coords
  //     setViewPort({ latitude, longitude})
  //   })
  // }, [])
  
  return (
    <div className="practice-map-container" >
      {/* <h1>Practice Map</h1>
      <Map
        height='100%'
        width='100%'
        style='mapbox://styles/mapbox/streets-v11'
        zoom= {[11]}
        center= {[-0.0541846, 51.5399592]}
			>
        <Marker  key="London" longitude={0.1276} latitude={51.5072}><span>🎈</span></Marker>
      </Map> */}
      <ReactMapGL
      initialViewState={{
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14
      }}
        mapboxAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
        height='100%'
        width='100%'
        mapStyle='mapbox://styles/mapbox/streets-v11'
        
        // {...viewPort}
        // onViewStateChange={viewport => setViewPort(viewport)}

      >
        <Marker  key="London" longitude={0.1276} latitude={51.5072}><span>🎈</span></Marker>
      </ReactMapGL>
    </div>
  )
}

export default PracticeMap