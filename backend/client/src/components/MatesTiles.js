import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner, Box, Heading, Avatar, HStack, Stack, Text, AvatarGroup, Image, Button, Center } from '@chakra-ui/react'
import AddMate from './subComponents/AddMate'

const MatesTiles = () => {
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)

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
        console.log(err)
      }
    }
    getMates()
  }, [count])

  const listenToChild = () => {
    setCount(count + 1)
  }
  return (
    <>
      <div className='mates-tiles-container'>
        <Heading as='h1' margin={3} size='2xl'>Your Mates</Heading>
        <Button margin={6} onClick={() => navigate('/mates')}>See Mates Map</Button>
        <div className='mates-tiles-mates-container'>
          {data.length ?
            data.map(mate => (
              <Link key={mate._id} to={`/mate/${mate._id}`}>
                <Box p={3} borderWidth='1px' borderRadius={10} shadow='md' className='box'>
                  <HStack spacing={5} marginBottom={3}>
                    <Avatar name={mate.username} src={mate.profilePhoto} />
                    <Stack>
                      <Heading as='h2' size='xl' isTruncated>{mate.username}</Heading>
                      {mate.ownedHolidays.length ?
                        <Text>{mate.ownedHolidays.length} holidays</Text>
                        : <Text>No holidays yet...</Text>}
                    </Stack>
                  </HStack>
                  {!!mate.ownedHolidays.length &&
                    <div className='images-container' size='md' max={3}>
                      {mate.ownedHolidays.map((holiday, i) => {
                        if (i < 1) return <Image margin={0.3} boxSize='100px' borderRadius='10px 0 0 10px' key={holiday._id} alt={holiday.title} src={holiday.image} objectFit='cover' />
                        if (i < 2) return <Image margin={0.3} boxSize='50px' borderRadius='0 10px 0 0' key={holiday._id} alt={holiday.title} src={holiday.image} objectFit='cover' />
                        if (i < 3) return <Image margin={0.3} boxSize='50px' borderRadius='0 0 10px 0' key={holiday._id} alt={holiday.title} src={holiday.image} objectFit='cover' />
                      })}
                    </div>
                  }
                </Box>
              </Link>
            ))
            :
            <Spinner />}
        </div>
        <AddMate listenToChild={listenToChild} />
      </div>

    </>
  )
}

export default MatesTiles