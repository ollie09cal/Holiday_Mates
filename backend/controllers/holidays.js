import Holiday from './../models/holiday.js'
import HolidayType from './../models/holidayType.js'

export const addHoliday = async (req, res) => {
  try {
    const holidayToAdd = await Holiday.create({ ...req.body, owner: req.currentUser._id })
    return res.status(201).json(holidayToAdd)
  } catch (err) {
    return res.status(422).json(err)
  }
}

export const showAllHolidays = async (_req, res) => {
  try {
    const holidays = await Holiday.find().populate('owner').populate({ path: 'holidayTypes' })
    return res.status(200).json(holidays) 
  } catch (err) {
    return res.status(404).json(err)
  }
}

export const getHolidayById = async (req, res) => {
  try {
    const { id } = req.params
    const holiday = await (Holiday.findById(id)).populate('owner').populate({ path: 'holidayTypes' })
    return res.status(200).json(holiday)
  } catch (err) {
    return res.status(404).json(err)
  }
}

export const addHolidayCard = async (req, res) => {
  try {
    const { id } = req.params
    const holiday = await Holiday.findById(id)

    if (!holiday.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    const holidayCardToAdd = await HolidayType.create({ ...req.body, owner: req.currentUser._id, holidayId: id })
    // console.log('holiday card ---> ', holidayCardToAdd)
    holiday.holidayTypes.push(holidayCardToAdd._id)
    await holiday.save()
    // console.log(holiday)
    return res.status(201).json(holiday)
  } catch (err) {
    return res.status(422).json(err)
  }
}

export const updateHoliday = async (req, res) => {
  try {
    const { id } = req.params
    const holidayToUpdate = await Holiday.findById(id)

    if (!holidayToUpdate.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')

    Object.assign(holidayToUpdate, req.body)
    await holidayToUpdate.save()
    return res.status(200).json(holidayToUpdate)
  } catch (err) {
    return res.status(404).json(err)
  }
}

export const updateHolidayCard = async (req, res) => {
  try {
    const { cardId } = req.params
    const holidayCardToUpdate = await HolidayType.findById(cardId)

    if (!holidayCardToUpdate.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')

    Object.assign(holidayCardToUpdate, req.body)
    await holidayCardToUpdate.save()
    return res.status(200).json(holidayCardToUpdate)
  } catch (err) {
    return res.status(404).json(err)
  }
}

export const deleteHolidayTypeCard = async (req, res) => {
  try {
    const { cardId } = req.params
    const holidayTypeCardToDelete = await HolidayType.findById(cardId)
    console.log(holidayTypeCardToDelete)
    if (!holidayTypeCardToDelete) throw new Error('Holiday Card Not Found!')
    console.log(holidayTypeCardToDelete.holidayId)
    const holiday = await Holiday.findById(holidayTypeCardToDelete.holidayId)
    console.log(holiday)
    if (!holiday) throw new Error('Holiday not found')
    if (!holiday.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    if (!holidayTypeCardToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')

    const indexOfHolidayCard = holiday.holidayTypes.indexOf(holidayTypeCardToDelete._id)
    holiday.holidayTypes.splice(indexOfHolidayCard, 1)

    await holidayTypeCardToDelete.remove()
    
    await holiday.save()

    return res.sendStatus(204) 
  } catch (err) {
    return res.status(404).json(err)
  }
}

export const deleteHoliday = async (req, res) => {
  try {
    const { id } = req.params
    const holidayToDelete = await Holiday.findById(id)
    if (!holidayToDelete) throw new Error('Holiday not found')
    if (!holidayToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    if (holidayToDelete.holidayTypes) {
      console.log('holiday type ids ---> ', holidayToDelete.holidayTypes)
      holidayToDelete.holidayTypes.forEach((holidayTypeId) => {
        console.log(holidayTypeId)
        clearHolidayTypes(holidayTypeId)
      })
    }
    await holidayToDelete.save()
    await holidayToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    return res.status(404).json(err)
  }
}

export const showHolidayTypeCards = async (_req, res) => {
  // console.log('I am trying to show all the holiday types')
  try {
    const holidayTypes = await HolidayType.find()
    console.log(holidayTypes)
    return res.status(200).json(holidayTypes) 
  } catch (err) {
    return res.status(404).json(err)
  }
}

export const showHolidayCard = async (req, res) => {
  try {
    const { cardId } = req.params
    const holidayType = await HolidayType.findById(cardId).populate('owner')
    console.log(holidayType)
    return res.status(200).json(holidayType) 
  } catch (err) {
    return res.status(404).json(err)
  }
}


//FUNCTIONS
//remove holiday card function
const clearHolidayTypes = async (id) => {
  try {
    const holidayTypeCardToDelete = await HolidayType.findById(id)
    holidayTypeCardToDelete.remove()
  } catch (err) {
    console.log(err)
  }
}
