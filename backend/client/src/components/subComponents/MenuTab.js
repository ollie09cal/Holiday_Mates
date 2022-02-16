import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, MenuButton, IconButton, MenuList, MenuItem, Heading, Link } from '@chakra-ui/react'
import { AddIcon, AtSignIcon, HamburgerIcon, LockIcon, StarIcon, SunIcon } from '@chakra-ui/icons'

const MenuTab = () => {

  const navigate = useNavigate()
  const handleLogOut = () => {
    window.localStorage.removeItem('holiday-token')
    navigate('/')
  }

  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon />}
        variant='outline'
      />
      <MenuList>
        <MenuItem icon={<AtSignIcon />} onClick={() => navigate('/profile')}>Profile</MenuItem>
        <MenuItem icon={<AddIcon />} onClick={() => navigate('/addholiday')}>Add Holiday</MenuItem>
        <MenuItem icon={<StarIcon />} onClick={() => navigate('/mates')}>Mates</MenuItem>
        <MenuItem icon={<SunIcon />} onClick={() => navigate('/search')}>Explore the map</MenuItem>
        <MenuItem icon={<LockIcon />} onClick={() => handleLogOut()}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MenuTab