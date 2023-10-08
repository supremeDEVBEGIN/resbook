const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const moment = require("moment-timezone");

module.exports = (db) => {
    router.get("/dashboard", async (req, res) => {
        try {
            let result = await db.collection("booking").aggregate([{
                $match:
                {
                    time: {
                        $gte: new Date(moment().subtract(7, `day`).startOf('day')),
                        $lte: new Date(moment().endOf('day'))
                    }
                }
            }, {
                $group: {
                    _id: { $dayOfYear: '$time' },
                    time: { $last: "$time" },
                    count: {
                        $sum: 1
                    }
                }
            }]).toArray()
            res.status(200).json(result)
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    });

    router.get("/dashboardtoday", async (req, res) => {
        try {
            console.log({
                $gte: moment().startOf('day'),
                $lte: moment().endOf('day')
            });
            let result = await db.collection("booking").aggregate([{
                $match:
                {
                    time: {
                        $gte: new Date(moment().startOf('day')),
                        $lte: new Date(moment().endOf('day'))
                    }
                }
            }]).toArray()
            res.status(200).json(result)
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    });

    router.get("/dashboarduser", async (req, res) => {
        try {
            let result = await db.collection("users").count({

            })
            res.status(200).json(result)
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    });

    return router;
};