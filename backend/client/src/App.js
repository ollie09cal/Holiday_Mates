import React, { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
//page imports
import PracticeMap from './components/practicemap'
import ViewHoliday from './components/ViewHoliday'
import ViewHolidayCard from './components/ViewHolidayCard'

import { ChakraProvider } from '@chakra-ui/react'

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
          <Route path='/viewholiday' element={<ViewHoliday />}/>
          <Route path='/viewholidaycard' element={<ViewHolidayCard />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
