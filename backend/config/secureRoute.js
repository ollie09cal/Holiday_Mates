import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from './enviroment.js'

export const secureRoute = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('Missing Header')

    const token = req.headers.authorization.replace('Bearer ', '')
    console.log('token: ', token)

    const payload = jwt.verify(token, secret)
    console.log('payload: ', payload)

    const userToVerify = await User.findById(payload.sub)
    console.log('userToVerify: ', userToVerify)

    if (!userToVerify) throw new Error('User Not Found')

    req.currentUser = userToVerify

    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Unauthorised' })
  }
}