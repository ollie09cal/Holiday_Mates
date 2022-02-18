import React from 'react'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Button,
  Box,
  useToast,
  Center
} from '@chakra-ui/react'
import { ImageUpload } from '../subComponents/ImageUpload'
import { SmallAddIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Register = () => {

  const navigate = useNavigate()
  const toast = useToast()

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
      toast({
        title: 'Registered.',
        description: "Your account is ready to be logged in.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      navigate('/login')
    } catch (err) {
      console.log(err.response.data.errors)
      setFormError({ ...formError, ...err.response.data.errors })
      toast({
        title: 'Error',
        description: "Registration failed.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      console.log(formError)
    }
  }

  const handleChange = (e) => {
    setFormError({ ...formError, [e.target.id]: '' })
    const newObj = { ...registerInfo, [e.target.id]: e.target.value }
    setRegisterInfo(newObj)
  }

  const handleImageURL = (url) => {
    setRegisterInfo({ ...registerInfo, profilePhoto: url })
  }

  return (
    <div className="register-container">
      <div className="register-form-container">
        <Box p={3} borderWidth='1px' borderRadius={10} shadow='md' bg="#f7f4f4">
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
              <FormLabel htmlFor='personalToken'>Mate&apos;s Code</FormLabel>
              <Input
                id='personalToken'
                type='text'
                placeholder='myUniqueCode1'
                defaultValue={registerInfo.personalToken}
                onChange={handleChange}
                minLength='10'
                maxLength='20'
              />
              {formError.personalToken && <FormErrorMessage>Mate&apos;s Code is invalid. Try again.</FormErrorMessage>}
              <FormHelperText>Mate&apos;s Code is what you connect with your mates. Choose a code 10-20 characters long.</FormHelperText>
            </FormControl>

            <ImageUpload value={registerInfo.profilePhoto} name="profileImage" handleImageURL={handleImageURL} />

            <Center><Button
              type='submit'
              rightIcon={<SmallAddIcon />}
              onSubmit={() => {
                handleSubmit()
              }}>Register</Button>
            </Center>

          </form>
        </Box>
      </div>
    </div>
  )
}

export default Register