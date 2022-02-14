import React from 'react'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Button,
  Box,
} from '@chakra-ui/react'
import { SmallAddIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Register = () => {

  const navigate = useNavigate()

  const [registerInfo, setRegisterInfo] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    profilePhoto: '',
    personalToken: ''
  })

  const [formError, setFormError] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    profilePhoto: '',
    personalToken: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/register', registerInfo)
      navigate('/login')
    } catch (err) {
      console.log(err.response.data.errors)
      setFormError({ ...formError, ...err.response.data.errors })
      console.log(formError)
    }
  }

  const handleChange = (e) => {
    setFormError({ ...formError, [e.target.id]: '' })
    const newObj = { ...registerInfo, [e.target.id]: e.target.value }
    setRegisterInfo(newObj)
  }

  return (
    <div className="register-container">
      <div className="register-form-container">
        <Box p={3} m={2} borderWidth='1px' borderRadius={10} shadow='md'>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired isInvalid={formError.username}>
              <FormLabel htmlFor='username'>Username</FormLabel>
              <Input
                id='username'
                type='text'
                placeholder='Username'
                defaultValue={registerInfo.username}
                onChange={handleChange}
              />
              {formError.username && <FormErrorMessage>Username is already in use.</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired isInvalid={formError.email}>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input
                id='email'
                type='email'
                placeholder='Email'
                defaultValue={registerInfo.email}
                onChange={handleChange}
              />
              {formError.email && <FormErrorMessage>Email is already in use.</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                id='password'
                type='password'
                placeholder='Password'
                defaultValue={registerInfo.password}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired isInvalid={formError.passwordConfirmation}>
              <FormLabel htmlFor='passwordConfirmation'>Confirm your password</FormLabel>
              <Input
                id='passwordConfirmation'
                type='password'
                placeholder='Password'
                defaultValue={registerInfo.passwordConfirmation}
                onChange={handleChange}
              />
              {formError.passwordConfirmation && <FormErrorMessage>Password does not match</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired isInvalid={formError.personalToken}>
              <FormLabel htmlFor='personalToken'>MatesCode</FormLabel>
              <Input
                id='personalToken'
                type='text'
                placeholder='myUniqueCode1'
                defaultValue={registerInfo.personalToken}
                onChange={handleChange}
                minLength='10'
                maxLength='20'
              />
              {formError.personalToken && <FormErrorMessage>MatesCode is invalid. Try again.</FormErrorMessage>}
              <FormHelperText>MatesCode is what you connect with your mates. Choose a code 10-20 characters long.</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='profileImage'>Profile Image</FormLabel>
              <Input id='profileImage' type='file' />
            </FormControl>

            <Button type='submit' rightIcon={<SmallAddIcon />} onSubmit={handleSubmit}>Register</Button>

          </form>
        </Box>
      </div>
    </div>
  )
}

export default Register