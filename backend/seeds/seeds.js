import mongoose from 'mongoose'
// import { dbURI } from '../config/enviroment.js'
import 'dotenv/config' // only needs to be added if it doesn't already exist

import userData from './data/users.js'
import User from './../models/user.js'
import Holiday from '../models/holiday.js'
import holidayData from './data/holidays.js'
import HolidayType from '../models/holidayType.js'
import holidayTypeData from './data/holidayTypes.js'

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('Connected to database in Seeds!')

    await mongoose.connection.db.dropDatabase()
    console.log('Database dropped')

    const users = await User.create(userData)
    console.log(`${users.length} users added to database!`)
    //add owners to holiday, each get three
    const holidaysWithOwners = holidayData.map((holiday, i) => {
      return { ...holiday, owner: users[Math.floor(i / 3)] }
    })

    const holidaysAdded = await Holiday.create(holidaysWithOwners)
    console.log(`${holidaysAdded.length} holidays added to database!`)

    const holidayTypesWithOwners = holidayTypeData.map((holidayType, i) => {
      //linking owner and holiday main card with holiday card. 3 types per holiday, 3 holidays per owner
      return { ...holidayType, owner: users[Math.floor(i / 9)]._id, holidayId: holidaysAdded[Math.floor(i / 3)]._id }
    })

    const holidayTypesAdded = await HolidayType.create(holidayTypesWithOwners)

    //pushing holiday types to holidays
    holidayTypesAdded.forEach(async (holidayType, i) => {
      holidaysAdded[Math.floor(i / 3)].holidayTypes.push(holidayType._id)
    })

    //save each main holiday
    for (let i = 0; i < holidaysAdded.length; i++) {
      await holidaysAdded[i].save()
    }
    console.log(`${holidayTypesAdded.length} holiday types added to database!`)

    await mongoose.connection.close()
  } catch (err) {
    console.log(err)
    await mongoose.connection.close()
  }
}
seedDB()