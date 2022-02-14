import React, { useState, useEffect } from 'react'
import ReactMapGl, { Marker } from 'react-map-gl'
import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../enviroment/env'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Input, Button, FormControl, Box} from '@chakra-ui/react'


const Search = () => {

  const [viewPort, setViewPort] = useState(null)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [searchValues, setSearchValues] = useState({search: ''})
  const [resultsOptions, setResultsOptions] = useState([])
  

    const handleChange = (e) => setSearchValues({...searchValues, [e.target.name]: e.target.value })

    const handleSubmit = async () => {
      try {
        const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValues.search}.json?access_token=pk.eyJ1IjoianZpY2tlcnMiLCJhIjoiY2t6bGFuZTNoMHl3MDJza2Vvd2U2Mm84cSJ9.nYy2TJv3ChiUdpl4CLtYJA`)
        console.log(data.features)
        const results = data.features
        console.log(results)
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



  
  return (
    <>
      <h1>Search</h1>
      <Box>
        <form>
          <FormControl >
            <Input placeholder='search' size='md' name='search' value={searchValues.search} onChange={handleChange}/>
            <Button onClick={handleSubmit}>Search</Button>
          </FormControl>
        </form>
      </Box>
      
      
      {resultsOptions.length && 
        resultsOptions.map((option, i) => {
          return(
            <div key={i} >
              <p>{option.place_name}</p>
            </div>
          )
        })}
      <div className="map-container" >
        {viewPort ?
          <ReactMapGl
            initialViewState={{ ...viewPort, zoom: 10 }}
            style={{ width: '100%', height: '100%' }}
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