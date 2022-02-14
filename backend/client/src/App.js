import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import NavigationBar from './components/NavigationBar'
import Register from './components/Register'
import Login from './components/Login'
import PracticeMap from './components/practicemap'
import ViewHoliday from './components/ViewHoliday'

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/practicemap' element={<PracticeMap />} />
          <Route path='/viewholiday' element={<ViewHoliday />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
