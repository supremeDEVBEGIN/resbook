const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const moment = require("moment-timezone")
module.exports = (db) => {
    router.post("/booking", async (req, res) => {
        try {
            const { body } = req
            db.collection("booking").insertOne({ ...body, time: new Date(body.time) })
            res.sendStatus(201)
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    });

    router.get("/booking", async (req, res) => {
        try {
            let table = req.query.table
            let date
            // if(!table){
            //     date = await db.collection("booking").aggregate([{ $match: { time: { $gte: new Date(moment().startOf('day')), $lte: new Date(moment().endOf('day')) } } }]).toArray()
            // }else{
            //     date = await db.collection("booking").aggregate([{ $match: { table: table, time: { $gte: new Date(moment().startOf('day')), $lte: new Date(moment().endOf('day')) } } }]).toArray()
            // }
            date = await db.collection("booking").aggregate([{ $match: { status: {$ne: "disable"}, time: { $gte: new Date(moment().startOf('day')), $lte: new Date(moment().endOf('day')) } } }]).toArray()
            res.status(200).json(date)
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    })


    return router;
};