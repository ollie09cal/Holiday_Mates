import React, { Profiler } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import { ChakraProvider } from '@chakra-ui/react'

//Pages --->
import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import PracticeMap from './components/practicemap'
import ViewHoliday from './components/ViewHoliday'
import ViewHolidayCard from './components/ViewHolidayCard'
import Search from './components/Search'
import Profile from './components/Profile'

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/viewholiday' element={<ViewHoliday />} />
          <Route path='/viewholidaycard' element={<ViewHolidayCard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/practicemap' element={<PracticeMap />} />
          <Route path='/search' element={<Search />} />
          <Route path='/profile' element={<Profile />} />
        </Routes >
      </BrowserRouter >
    </ChakraProvider >
  )
}

export default App
