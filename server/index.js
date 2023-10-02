const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000
const connectDB = require('./src/config/db')
const dotenv = require('dotenv');
const routes = require('./routes')
dotenv.config();

connectDB().then(db => {
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    routes(app,db)
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
})
.catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
})

