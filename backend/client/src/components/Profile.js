import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Spinner, Box, Stack, HStack, Heading, Text, Avatar, AvatarGroup, Button, Image, Center } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import AddMate from './subComponents/AddMate'

const Profile = () => {
  //state
  const [profileData, setProfileData] = useState(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const getData = async () => {
      try {
        const token = window.localStorage.getItem('holiday-token')
        const { data } = await axios.get('api/profile', {
          headers: {Authorization: `Bearer ${token}`}
        })
        await setProfileData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[count])
  
  const listenToChild = () => {
    setCount(count + 1)
  }
  return (
    <div className='main-container'>
      <div className='background'></div>
      <section className='profile-container'>
        {profileData ?
        <>
          <div className='header-mates-container'>
            <div className='profile-header-container'>
              
              <Box p={3} borderWidth='1px' borderRadius={10} shadow='md' className='box'>
                  <div className='profile-card-container'>
                    <Avatar name={profileData.username} marginRight={3} showBorder size='2xl' src={profileData.profilePhoto} />
                    <Stack>
                      <Heading as='h1' size='xl' isTruncated>
                        {profileData.username}
                      </Heading>
                      <Text isTruncated>
                        MatesCode: <span className="bold">{profileData.personalToken}</span>
                      </Text>
                      <Text>
                        {profileData.ownedHolidays.length} holidays
                      </Text>
                    </Stack>
                  </div>
              </Box>
            </div>
            
            <Box p={3} borderWidth='1px' borderRadius={10} shadow='md' display='flex' flexDirection='column' alignItems='center' className='box'>
              <Link to={'/matestiles'}>
                <Heading as='h3' size='md' marginBottom={4} isTruncated>
                  Mates
                </Heading>
              </Link>
              
              <AvatarGroup size='md' max={5} marginBottom={2}>
                {profileData.mates.length ?
                  profileData.mates.map(mate => (
                    <Avatar key={mate._id} name={mate.username} showBorder src={mate.profilePhoto} />
                  ))
                :
                <Text>Looking a bit lonely...</Text>}
              </AvatarGroup>
              <div className='addMateContainer'>
                <AddMate listenToChild={listenToChild}/>
              </div>
            </Box>
          </div>
          
          <div className='profile-holidays-container'>
              <Center marginBottom={4} >
                <Heading as='h2' size='lg' isTruncated>
                  Holidays
                </Heading>
                <Link to={'/addholiday'}>
                  <Button marginLeft={5}>+</Button>
                </Link>
              </Center>
              
            
            {profileData.ownedHolidays.length ?
              profileData.ownedHolidays.map(holiday => (
                <div key={holiday._id}>
                  <Link to={`/viewholiday/${holiday._id}`}>
                    <Box p={3} borderWidth='1px' borderRadius={10} shadow='md' maxW='400px' className='box'>
                      <Stack spacing={2} display='flex' flexDirection='column' alignItems='center'>
                        {/* create a vertical stack for profile image */}
                        <Heading as='h3' size='lg' isTruncated maxW='350px' >
                          {holiday.title}
                        </Heading>
                        <Heading as='h4' size='md' isTruncated maxW='350px'>
                          {holiday.location}
                        </Heading>
                        <Text>
                          {holiday.description}
                        </Text>
                        <div className='ratings-wrapper'>
                          <Box display='flex' mt='2' alignItems='center' className='box'>
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
                        </div>
                        <Image src={holiday.image} boxSize='300px' objectFit='cover' alt={`image of ${holiday.location}`} borderRadius={15} />
                      
                      </Stack>
                    </Box>
                  </Link>  
                </div>
              ))
              : <Text>No Holidays yet...</Text>}
          </div>
            
        </>
          : <Spinner /> }
      </section>
    </div>
    
  )
}

export default Profile