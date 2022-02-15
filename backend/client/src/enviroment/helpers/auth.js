import { Buffer } from 'buffer'

const getTokenFromLocal = () => {
  return window.localStorage.getItem('holiday-token')
}

const getPayload = () => {
  const token = getTokenFromLocal()
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length < 3) return
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

export const userAuth = () => {
  const payload = getPayload()
  if (!payload) return
  const currentTime = Math.round(Date.now() / 1000)
  console.log('userAuth firing up', currentTime, 'payload-->', payload.exp)
  return currentTime < payload.exp
}