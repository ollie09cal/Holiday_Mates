import React from 'react'
import { Menu, MenuButton, IconButton, MenuList, MenuItem, Heading } from '@chakra-ui/react'
import { AddIcon, AtSignIcon, HamburgerIcon, LockIcon, StarIcon, SunIcon } from '@chakra-ui/icons'

const MenuTab = () => {

  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon />}
        variant='outline'
      />
      <MenuList>
        <MenuItem icon={<AtSignIcon />}>Profile</MenuItem>
        <MenuItem icon={<AddIcon />}>Add Holiday</MenuItem>
        <MenuItem icon={<StarIcon />}>Mates</MenuItem>
        <MenuItem icon={<SunIcon />}>Explore the map</MenuItem>
        <MenuItem icon={<LockIcon />}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MenuTab