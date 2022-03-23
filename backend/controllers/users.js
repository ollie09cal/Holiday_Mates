import User from './../models/user.js'
// import { requestFriend } from 'mongoose-friends'

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id).populate({ path: 'ownedHolidays', populate: { path: 'holidayTypes' } }).populate({ path: 'mates' })
    if (!user) throw new Error('user not found')
    return res.status(200).json(user)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

export const addMate = async (req, res) => {
  try {
    const friendToAdd = await User.findOne({ username: req.body.mateUsername })

    if (!(req.body.mateToken === friendToAdd.personalToken)) throw new Error('token and username do not match')
    if (friendToAdd.mates.includes(req.currentUser._id)) throw new Error('friend already added')
    
    friendToAdd.mates.push(req.currentUser._id)
    await friendToAdd.save()

    const user = await User.findById(req.currentUser._id)
    user.mates.push(friendToAdd._id)
    await user.save()

    return res.status(201).json(friendToAdd)
  } catch (error) {
    console.log(error)
    return res.status(404).json({ message: error.message })
  }
}

export const getMate = async (req, res) => {
  try {
    const { mateId } = req.params
    const mate = await User.findById(mateId).populate({ path: 'ownedHolidays', populate: { path: 'holidayTypes' } }).populate({ path: 'mates' })
    if (!mate.mates.some(mate => mate._id.equals(req.currentUser._id))) throw new Error('not authorised')
    return res.status(200).json(mate)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

export const getAllMates = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id).populate({ path: 'mates', populate: { path: 'ownedHolidays', populate: { path: 'holidayTypes' } } })
    console.log(user)
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

export const requestMate = async (req, res) => {
  try {
    const { mateId } = req.params
    const mate = await User.findById(mateId)
    if (!mate) throw new Error('Mate not found')
    if (mate.matesRequests.some(item => item === req.currentUser._id)) throw new Error('Mate request already sent')
    console.log(mate)
    mate.matesRequests.push(req.currentUser._id)
    await mate.save()
    const user = await User.findById(req.currentUser._id)
    user.requestsSent.push(mate._id)
    await user.save()
    return res.status(200).json({ message: 'Mate request sent', requestedMate: mate })
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

export const getMatesRequests = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id).populate({ path: 'matesRequests' })
    console.log(user)
    if (!user) throw new Error('User not found')
    if (!user.matesRequests.length) throw new Error('No mates requests')
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

export const confirmMatesRequest = async (req, res) => {
  try {
    const { mateId } = req.params
    const mateToAdd = await User.findById(mateId)
    if (!mateToAdd) throw new Error('Mate not found')
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error('User not found')
    if (mateToAdd.mates.includes(req.currentUser._id)) throw new Error('Already Mates')
    mateToAdd.mates.push(req.currentUser._id)
    mateToAdd.requestsSent.splice((mateToAdd.requestsSent.indexOf(req.currentUser._id)), 1)
    await mateToAdd.save()
    user.mates.push(mateToAdd._id)
    user.matesRequests.splice((user.matesRequests.indexOf(mateToAdd._id)), 1)
    await user.save()
    return res.status(201).json({ message: 'Mate added', mate: mateToAdd })
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

export const deleteMatesRequest = async (req, res) => {
  try {
    const { mateId } = req.params
    const mateToDelete = await User.findById(mateId)
    if (!mateToDelete) throw new Error('Mate not found')
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error('User not found')
    mateToDelete.requestsSent.splice(mateToDelete.requestsSent.indexOf(req.currentUser._id))
    await mateToDelete.save()
    user.matesRequests.splice(user.matesRequests.indexOf(mateToDelete._id))
    await user.save()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}