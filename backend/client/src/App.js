import React, { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import PracticeMap from './components/practicemap'
import { ChakraProvider } from '@chakra-ui/react'
import Search from './components/Search'

function App() {
  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axios.get('/api/holidays/') // * <-- replace with your endpoint
  //     console.log(data)
  //   }
  //   getData()
  // })

  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavigationBar />

        <Routes>
          <Route path='/practicemap' element={<PracticeMap />}/>
          <Route path='/Search' element={<Search />}/>

          <Route />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
