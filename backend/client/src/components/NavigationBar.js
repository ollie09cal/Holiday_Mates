import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { userAuth } from '../enviroment/helpers/auth'
import MenuTab from './subComponents/MenuTab'
// import { Menu, MenuButton, IconButton, MenuList, MenuItem, Heading } from '@chakra-ui/react'
// import { AddIcon, AtSignIcon, HamburgerIcon, LockIcon, StarIcon, SunIcon } from '@chakra-ui/icons'

const NavigationBar = () => {

  return (
    <Navbar className="navbar-container">
      <Container>
        <Navbar.Brand href='/'>Holiday Mates</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {userAuth() ?
          <MenuTab />
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