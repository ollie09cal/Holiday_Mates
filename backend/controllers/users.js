import User from './../models/user.js'
// import { requestFriend } from 'mongoose-friends'




export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id).populate({ path: 'ownedHolidays', populate: { path: 'holidayTypes' } })
    if (!user) throw new Error('user not found')
    return res.status(200).json(user)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

export const addMate = async (req, res) => {
  try {
    console.log(req.body)
    const friendToAdd = await User.findOne({ username: req.body.mateUsername })
    console.log(friendToAdd.personalToken)
    console.log(friendToAdd.personalToken === req.body.mateToken)
    if (!(req.body.mateToken === friendToAdd.personalToken)) throw new Error('token and username do not match')
    if (friendToAdd.mates.includes(req.currentUser._id)) throw new Error('friend already added')
    friendToAdd.mates.push(req.currentUser._id)
    await friendToAdd.save()
    const user = await User.findById(req.currentUser._id)
    user.mates.push(friendToAdd._id)
    await user.save()
    console.log(user, friendToAdd)
    return res.status(201).json(friendToAdd)
  } catch (error) {
    console.log(error)
    return res.status(404).json({ message: error.message })
  }
}