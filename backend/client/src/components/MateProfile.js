import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Spinner, Box, Stack, HStack, Heading, Text, Avatar, AvatarGroup, Image } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

const MateProfile = () => {
  //state
  const [profileData, setProfileData] = useState(null)
  const { mateId } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        console.log(mateId)
        const token = window.localStorage.getItem('holiday-token')
        const { data } = await axios.get(`/api/mates/${mateId}`, {
          headers: { Authorization: `Bearer ${token}`}
        })
        setProfileData(data)
        console.log(data)
        console.log('hello')
      } catch (err) {
        console.log(err.response)
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
              <Text>
                {profileData.ownedHolidays.length} holidays
              </Text>
            </Stack>
          </HStack>
        </Box>
        {/* mates */}
        <Box p={5} m={2} borderWidth='1px' shadow='md'>
          <Link to={'/mates'}>
            <Heading as='h3' size='md' isTruncated>
              Mates
            </Heading>
          </Link>
          
          <AvatarGroup size='sm' max={5}>
            {profileData.mates.length ?
              profileData.mates.map(mate => (
                <Avatar key={mate._id} name={mate.username} showBorder src={mate.profilePhoto} />
              ))
            :
            <Text>Looking a bit lonely...</Text>}
          </AvatarGroup>
        </Box>
        
          <HStack>
              <Heading as='h2' size='lg' isTruncated>
              Holidays
            </Heading>
            <Link to={'/addholiday'}>
            </Link>
          </HStack>
        
        {profileData.ownedHolidays.length ?
          profileData.ownedHolidays.map(holiday => (
            <div key={holiday._id}>
              <Link to={`/viewholiday/${holiday._id}`}>
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

export default MateProfile