import React from 'react'
import { timestamp } from '../../enviroment/env'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import axios from 'axios'


export const ImageUpload = (props) => {  //needs value = url, name = htmlFor&id, handleImageURL - hoisting
  const { value, name, handleImageURL } = props


  const handleUpload = async (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('api_key', process.env.REACT_APP_API_KEY)
    data.append('timestamp', timestamp)
    data.append('upload_preset', process.env.UPLOAD_PRESET)
    const res = await axios.post(process.env.UPLOAD_URL, data)
    console.log(res.data.url)
    handleImageURL(res.data.url)
  }

  return (
    <FormControl>
      <FormLabel htmlFor={name}>Upload Image</FormLabel>
      <Input id={name} type='file' onChange={handleUpload} />
      {value ? <img src={value} alt={name} /> : <></>}
    </FormControl>
  )
}

