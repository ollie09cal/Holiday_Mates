import express from 'express'
import { secureRoute } from './secureRoute.js'

//controllers
import { registerUser, loginUser } from './../controllers/auth.js'
import { addHoliday, showAllHolidays, getHolidayById, addHolidayCard, updateHoliday, updateHolidayCard, deleteHolidayTypeCard, deleteHoliday, showHolidayTypeCards, showHolidayCard } from './../controllers/holidays.js'
import { getProfile, addMate, getMate, getAllMates, requestMate, confirmMatesRequest, getMatesRequests, deleteMatesRequest } from './../controllers/users.js'

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
  .get(secureRoute, getHolidayById) //dont forget to add in secure route card
  .post(secureRoute, addHolidayCard)
  .put(secureRoute, updateHoliday)
  .delete(secureRoute, deleteHoliday)

//show all holiday type cards
router.route('/holidaytypes')
  .get(secureRoute, showHolidayTypeCards)

router.route('/holidaytypes/:cardId')
  .delete(secureRoute, deleteHolidayTypeCard)
  .get(secureRoute, showHolidayCard)
  .put(secureRoute, updateHolidayCard)

//profile route
router.route('/profile')
  .get(secureRoute, getProfile)

//mates requests
router.route('/profile/matesRequests')
  .get(secureRoute, getMatesRequests)

router.route('/profile/matesRequests/:mateId')
  .post(secureRoute, confirmMatesRequest)
  .delete(secureRoute, deleteMatesRequest)

//add mates with token
router.route('/mates')
  .post(secureRoute, addMate)
  .get(secureRoute, getAllMates)

router.route('/mates/:mateId')
  .get(secureRoute, getMate)
  .post(secureRoute, requestMate)



export default router