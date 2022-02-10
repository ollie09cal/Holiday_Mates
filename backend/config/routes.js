import express from 'express'
import { secureRoute } from './secureRoute.js'

//controllers
import { registerUser, loginUser } from './../controllers/auth.js'
import { addHoliday, showAllHolidays, getHolidayById, addHolidayCard, updateHoliday, updateHolidayCard, deleteHoliday } from './../controllers/holidays.js'
import { getProfile } from './../controllers/users.js'

const router = express.Router()

//ROUTES
//login/register
router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

//holiday
router.route('/holidays')
  .post(secureRoute, addHoliday)
  .get(secureRoute, showAllHolidays)


//holiday card
router.route('/holidays/:id')
  .get(secureRoute, getHolidayById)
  .post(secureRoute, addHolidayCard)
  .put(secureRoute, updateHoliday)
  .delete(secureRoute, deleteHoliday)

router.route('/holidays/:id/:cardId')
  .put(secureRoute, updateHolidayCard)


//profile route
router.route('/profile')
  .get(secureRoute, getProfile)

export default router