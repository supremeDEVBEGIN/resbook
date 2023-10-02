const express = require('express')
const router = express.Router()
const DEV_MODE = Boolean(process.env.DEV_MODE) || false
const CORS_ORIGIN = process.env.CORS_ORIGIN
const cors = require('cors')
var corsOptions = {
  origin: CORS_ORIGIN
}

const { register, login, profile, editProfile } = require('../controllers/users')
const booking = require('../controllers/booking')

module.exports = (db) => {
  if (DEV_MODE) {
    router.use(cors(corsOptions))
  }

  router.use('/api', register(db), login(db), profile(db), editProfile(db),booking(db))

  return router
}