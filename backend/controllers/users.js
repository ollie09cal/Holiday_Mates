import User from './../models/user.js'

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id).populate({path: 'ownedHolidays', populate: { path: 'holidayTypes' }})
    if (!user) throw new Error('user not found')
    return res.status(200).json(user)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}