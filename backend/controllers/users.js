export const addfriend = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id)
    const newMate = User.findOne({ personalToken: req.body.token })
    if (!newMate) throw new Error('mate not found')
    user.mates.push(newMate._id)
    return res.status(201).json({ message: 'friend added', friend: newMate }) 
  } catch (error) {
    console.log(error)
  }
}