import React, { useState, useEffect } from 'react'
import ReactMapGl, { Marker } from 'react-map-gl'
import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../enviroment/env'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Input, Button, FormControl, Box, VStack } from '@chakra-ui/react'

const Search = () => {

  const [viewPort, setViewPort] = useState({
    latitude: 51,
    longitude: -0.1,
    zoom: 10
  })
  const [currentLocation, setCurrentLocation] = useState(null)
  const [searchValues, setSearchValues] = useState({search: ''})
  const [resultsOptions, setResultsOptions] = useState([])

  

    const handleChange = (e) => setSearchValues({...searchValues, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValues.search}.json?access_token=pk.eyJ1IjoianZpY2tlcnMiLCJhIjoiY2t6bGFuZTNoMHl3MDJza2Vvd2U2Mm84cSJ9.nYy2TJv3ChiUdpl4CLtYJA`)
        const results = data.features
        setResultsOptions(results)
      } catch (err) {
        console.log(err)
      }
    }

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      console.log('position', latitude, longitude)
      setCurrentLocation({ latitude: latitude, longitude: longitude })
      setViewPort({ latitude: latitude, longitude: longitude })
    })
  }, [])

  const search = (e) => {
    // console.log(e.target.innerText)
    // console.log(resultsOptions[0].place_name)
    const { center } = resultsOptions[resultsOptions.findIndex(result => result.place_name === e.target.innerText)]
    setViewPort({ latitude: center[1], longitude: center[0], zoom: 8 })
    setResultsOptions([])
    setSearchValues({search: ''})
  }
  
  return (
    <>
      <h1>Search</h1>
      <Box>
        <form onSubmit={handleSubmit}>
          <FormControl >
            <Input placeholder='search' size='md' name='search' value={searchValues.search} onChange={handleChange}/>
            <Button type='Submit'>Search</Button>
          </FormControl>
          {!!resultsOptions.length && 
            <VStack spacing={4}>
              {resultsOptions.map((option, i) => {
                console.log(option)
                return(
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
        {currentLocation ?
          <ReactMapGl
            // initialViewState={{ ...viewPort, zoom: 10 }}
            {...viewPort}
            onMove={e => setViewPort(e.viewState)}
            style={{ width: '100%', height: '100%', transition: { duration: 300, delay: 0 }  }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
          >
            <Marker longitude={currentLocation.longitude} latitude={currentLocation.latitude} color="green" />
          </ReactMapGl>
          :
          <p>loading your location</p>}
        
      </div>
    </>
    
  )
}

export default Search