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
    const holidays = await Holiday.find()
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
    const { id, cardId } = req.params
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
    const holiday = await Holiday.findById(holidayTypeCardToDelete.holidayId)
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
