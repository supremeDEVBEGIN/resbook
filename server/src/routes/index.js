const express = require('express')
const router = express.Router()
const DEV_MODE = Boolean(process.env.DEV_MODE) || false
const CORS_ORIGIN = process.env.CORS_ORIGIN
const cors = require('cors')
var corsOptions = {
  origin: CORS_ORIGIN
}

const { register, login, profile, editProfile, loginLine } = require('../controllers/users')
const { createUser,getUsers,getUserById,deleteUserById,updateDetailUsers} = require('../controllers/admin')
const { history} = require('../controllers/history')
const dashboard = require('../controllers/dashboard')
const booking = require('../controllers/booking')

module.exports = (db) => {
  if (DEV_MODE) {
    router.use(cors(corsOptions))
  }

  router.use('/api', register(db), login(db), profile(db), editProfile(db),booking(db),loginLine(db),history(db))
  router.use('/api-admin',createUser(db),getUsers(db),getUserById(db),deleteUserById(db),updateDetailUsers(db))
  router.use(dashboard(db))

  return router
}