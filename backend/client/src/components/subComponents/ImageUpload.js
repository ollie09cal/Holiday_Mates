import React from 'react'
import { REACT_APP_CLOUDINARY_URL, REACT_APP_CLOUDINARY_PRESET } from '../../enviroment/env'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import axios from 'axios'

export const ImageUpload = (props) => {  //needs value = url, name = htmlFor&id, handleImageURL - hoisting
  const { value, name, handleImageURL } = props

  const uploadURL = REACT_APP_CLOUDINARY_URL
  const uploadPreset = REACT_APP_CLOUDINARY_PRESET

  const handleUpload = async (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadURL, data)
    handleImageURL(res.data.url)
  }

  return (
    <FormControl>
      <FormLabel htmlFor={name}>Profile Image</FormLabel>
      <Input id={name} type='file' onChange={handleUpload} />
      {value ? <img src={value} alt={name} /> : <></>}
    </FormControl>
  )
}

