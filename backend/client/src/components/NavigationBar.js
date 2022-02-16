import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { userAuth } from '../enviroment/helpers/auth'
// import MenuTab from './subComponents/MenuTab'
import { Menu, MenuButton, IconButton, MenuList, MenuItem } from '@chakra-ui/react'
import { AddIcon, ArrowBackIcon, AtSignIcon, HamburgerIcon, LockIcon, StarIcon, SunIcon } from '@chakra-ui/icons'

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    setIsLoggedIn(userAuth())
  }, )

  const navigate = useNavigate()
  const handleLogOut = () => {
    window.localStorage.removeItem('holiday-token')
    setIsLoggedIn(false)
    navigate('/')
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <Navbar className="navbar-container">
      <Container>
        <Navbar.Brand href='/'>Holiday Mates</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <IconButton aria-label='Go Back' icon={<ArrowBackIcon />} onClick={goBack}/>
        {isLoggedIn ?
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              <MenuItem icon={<AtSignIcon />} onClick={() => navigate('/profile')}>Profile</MenuItem>
              <MenuItem icon={<AddIcon />} onClick={() => navigate('/')}>Add Holiday</MenuItem>
              <MenuItem icon={<StarIcon />} onClick={() => navigate('/')}>Mates</MenuItem>
              <MenuItem icon={<SunIcon />} onClick={() => navigate('/search')}>Explore the map</MenuItem>
              <MenuItem icon={<LockIcon />}
                onClick={() => {
                  handleLogOut()
                }}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
          :
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        }

      </Container>
    </Navbar>
  )
}

export default NavigationBar