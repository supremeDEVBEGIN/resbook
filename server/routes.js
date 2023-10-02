const express = require('express')
const bodyParser = require('body-parser')
const apiver = require('./src/routes')

module.exports = (app, db) => {
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(apiver(db))
    return app
}
