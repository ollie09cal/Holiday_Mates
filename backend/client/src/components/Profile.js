import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Spinner, Box, Stack, HStack, Heading, Text, Avatar, AvatarGroup, Button, Image } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import AddMate from './subComponents/AddMate'

const Profile = () => {
  //state
  const [profileData, setProfileData] = useState(null)
  
  useEffect(() => {
    const getData = async () => {
      try {
        const token = window.localStorage.getItem('holiday-token')
        const { data } = await axios.get('api/profile', {
          headers: {Authorization: `Bearer ${token}`}
        })
        setProfileData(data)
        console.log('hello')
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[])
  

  return (
    <section className='profile-container'>
      {profileData ?
      <>
      {/* HEADER */}
        <Box p={5} m={2} borderWidth='1px' shadow='md'>
          <HStack spacing={5}>
            {/* create a vertical stack for profile image */}
            <Avatar name={profileData.username} showBorder size='xl' src={profileData.profilePhoto} />
            <Stack>
              <Heading as='h1' size='xl' isTruncated>
                {profileData.username}
              </Heading>
              <Text isTruncated>
                Personal Token: {profileData.personalToken}
              </Text>
              <Text>
                {profileData.ownedHolidays.length} holidays
              </Text>
            </Stack>
          </HStack>
        </Box>
        {/* mates */}
        <Box p={5} m={2} borderWidth='1px' shadow='md'>
          <Heading as='h3' size='md' isTruncated>
            Mates
          </Heading>
          <AvatarGroup size='sm' max={5}>
            {profileData.mates.length ?
              profileData.mates.map(mate => (
                <Avatar key={mate._id} name={mate.username} showBorder src={mate.profilePhoto} />
              ))
            :
            <Text>Looking a bit lonely...</Text>}
          </AvatarGroup>
          <AddMate />
        </Box>
        
          <HStack>
              <Heading as='h2' size='lg' isTruncated>
              Holidays
            </Heading>
            <Link to={'/addholiday'}>
              <Button>+</Button>
            </Link>
          </HStack>
        
        {profileData.ownedHolidays.length ?
          profileData.ownedHolidays.map(holiday => (
            <div key={holiday._id}>
              <Link to={`/viewHoliday/${holiday._id}`}>
                <Box p={5} m={2} borderWidth='1px' shadow='md' >
                  <Stack spacing={2}>
                    {/* create a vertical stack for profile image */}
                    <Heading as='h3' size='lg' isTruncated>
                      {holiday.title}
                    </Heading>
                    <Heading as='h4' size='md' isTruncated>
                      {holiday.location}
                    </Heading>
                    <Text>
                      {holiday.description}
                    </Text>
                    <Box display='flex' mt='2' alignItems='center'>
                      {Array(5)
                        .fill('')
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            color={i < holiday.avgRating ? 'teal.500' : 'gray.300'}
                          />
                        ))
                      }
                    </Box>
                    <Image src={holiday.image} alt={`image of ${holiday.location}`} borderRadius={15} />
                  
                  </Stack>
                </Box>
              </Link>  
            </div>
          ))
          : <Text>No Holidays yet...</Text>}
      </>
        : <Spinner /> }
    </section>
  )
}

export default Profile