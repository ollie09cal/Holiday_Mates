import mongoose from 'mongoose'
import { dbURI } from '../config/enviroment.js'
import userData from './data/users.js'
import User from './../models/user.js'
// import Holiday from '../models/holiday.js'
// import holidayData from './data/holidays'

const seedDB = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('Connected to database in Seeds!')

    await mongoose.connection.db.dropDatabase()
    console.log('Database dropped')

    const users = await User.create(userData)
    console.log(`${users.length} users added to database!`)

    // const holidaysWithOwners = holidayData.map(holiday => {
    //   return { ...holiday, owner: users[0]._id }
    // })

    // await Holiday.create(holidayData)
    // console.log(`${holidayData.length} holidays added to database!`)

    //const holidaysAdded = await Holiday.create(holidayData)
    //const holidayTypesAdded = await HolidayType.create(holidayTypeData)

    await mongoose.connection.close()
  } catch (err) {
    console.log(err)
    await mongoose.connection.close()
  }
}
seedDB()