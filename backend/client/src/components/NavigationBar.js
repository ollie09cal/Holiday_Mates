import React from 'react'
//import { Link } from 'react-router-dom'
import { Menu, MenuButton, IconButton, MenuList, MenuItem, Heading } from '@chakra-ui/react'
import { AddIcon, AtSignIcon, HamburgerIcon, LockIcon, StarIcon, SunIcon } from '@chakra-ui/icons'

const NavigationBar = () => {

  return (
    <div className="navbar-container">
      <Heading as='h1' size='lg'>Holiday Mates</Heading>
    </div>
  )
}

export default NavigationBar