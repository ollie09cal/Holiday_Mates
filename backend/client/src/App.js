import React, { Profiler } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import NavigationBar from './components/NavigationBar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import PracticeMap from './components/practicemap'
import Search from './components/Search'
import ViewHoliday from './components/ViewHoliday'
import Profile from './components/Profile'

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/practicemap' element={<PracticeMap />} />
          <Route path='/Search' element={<Search />} />
          <Route path='/viewholiday' element={<ViewHoliday />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
