import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { userAuth } from '../enviroment/helpers/auth'
import MenuTab from './subComponents/MenuTab'
import { IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(userAuth())
  })

  const navigate = useNavigate()

  return (
    <Navbar className="navbar-container">
      <Container>
        <Navbar.Brand >Holiday Mates</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <IconButton aria-label='Go Back' icon={<ArrowBackIcon />} onClick={() => navigate(-1)}/>
        {isLoggedIn ?
          <MenuTab />
          :
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        }

      </Container>
    </Navbar>
  )
}

export default NavigationBar