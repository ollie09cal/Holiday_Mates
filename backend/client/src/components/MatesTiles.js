import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner, Box, Heading, Avatar, HStack, Stack, Text, AvatarGroup, Button } from '@chakra-ui/react'

const MatesTiles = () => {
  const [data, setData] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const getMates = async () => {
      try {
        const token = window.localStorage.getItem('holiday-token')
        const { data } = await axios.get('api/mates', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setData(data.mates)
      } catch (err) {
        console.log(err.message)
      }}
    console.log('happening')
    getMates()
  }, [])
  return (
    <>
      <Heading as='h1' size='2xl'>Your Mates</Heading>
        <Button onClick={() => navigate('/mates')}>See Mates Map</Button>
      {data.length ?
        data.map(mate => (
          <Link key={mate._id} to={`/mate/${mate._id}`}>
            <Box p={5} m={2} borderWidth='1px' shadow='md'>
              <HStack spacing={5}>
                <Avatar name={mate.username} src={mate.profilePhoto} />
                <Stack>
                  <Heading as='h2' size='xl' isTruncated>{mate.username}</Heading>
                  {!!mate.ownedHolidays.length &&
                  <AvatarGroup size='md' max={3}>
                    {mate.ownedHolidays.map(holiday => (
                      <Avatar key ={holiday._id} name={holiday.title} src={holiday.image} />
                    ))}
                  </AvatarGroup>
                  }
                </Stack>
                
              </HStack>
            </Box>
          </Link>
        ))
        :
        <Spinner />}
    </>
  )
}

export default MatesTiles