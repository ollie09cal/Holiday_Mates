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