import React from 'react'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import { ChakraProvider } from '@chakra-ui/react'

//Pages --->
import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ViewHoliday from './components/ViewHoliday'
import ViewHolidayCard from './components/ViewHolidayCard'
import Search from './components/Search'
import Profile from './components/Profile'
import AddHoliday from './components/AddHoliday'
import AddHolidayCard from './components/AddHolidayCard'
import MatesMap from './components/MatesMap'
import MateProfile from './components/MateProfile'
import MatesTiles from './components/MatesTiles'

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/viewholiday/:holidayid' element={<ViewHoliday />} />
          <Route path='/viewholidaycard/:holidaycardid' element={<ViewHolidayCard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/search' element={<Search />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/addholiday' element={<AddHoliday />} />
          <Route path='/addholidaycard/:holidayid' element={<AddHolidayCard />} />
          <Route path='/mates' element={<MatesMap />} />
          <Route path={'/mate/:mateId'} element={<MateProfile  />} />
          <Route path={'/matestiles'} element={<MatesTiles />} />
        </Routes >
      </BrowserRouter >
    </ChakraProvider >
  )
}

export default App
