import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const toast = useToast()

  //setting local token
  const setTokenFromLocal = (token) => {
    window.localStorage.setItem('holiday-token', token)
  }

  //Login details
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })

  //Error messages
  const [isError, setIsError] = useState({
    error: false, message: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/login', loginInfo)
      setTokenFromLocal(data.token)
      navigate('/profile')
    } catch (err) {
      console.log(err)
      setIsError({ error: true, message: 'Username and password does not match.' })
      toast({
        title: 'Error',
        description: "Failed to login.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleChange = (e) => {
    const newObj = { ...loginInfo, [e.target.id]: e.target.value }
    setLoginInfo(newObj)
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <Box p={3} m={2} borderWidth='1px' borderRadius={10} shadow='md'>
          <form onSubmit={handleSubmit}>

            <FormControl isRequired isInvalid={isError.error} onSubmit={handleSubmit}>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input id='email' type='email' placeholder='Email' defaultValue={loginInfo.email} onChange={handleChange} />
            </FormControl>

            <FormControl isRequired isInvalid={isError.error}>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input id='password' type='password' placeholder='Password' defaultValue={loginInfo.password} onChange={handleChange} />
              {isError.error && <FormErrorMessage>{isError.message}</FormErrorMessage>}
            </FormControl>

            <Button type='submit' onSubmit={handleSubmit}>Log me in</Button>

          </form>
        </Box>
      </div>
    </div>
  )
}

export default Login