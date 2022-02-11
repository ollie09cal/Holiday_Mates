import express from 'express'
import mongoose from 'mongoose'
import router from './config/routes.js'
import { port, dbURI } from './config/enviroment.js'

const app = express()

//server setup
const startServer = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('✅ mongoDB server connected ✅')

    //JSON parser
    app.use(express.json())

    //Middleware
    //logger
    app.use((req, _res, next) => {
      console.log(`🚩 request has been recieved ${req.method} - ${req.url}`)
      next()
    })
    //routes //add this in once routes are made
    app.use('/api', router)

    //CATCH all
    app.use((_req, res) => {
      return res.status(404).json({ message: "route not found" })
    })

    app.listen(port, () => console.log(`server is listening on port ${port}`))

  } catch (err) {
    console.log(err)
  }

}
startServer()