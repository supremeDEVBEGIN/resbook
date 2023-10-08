const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const moment = require("moment-timezone")
module.exports = (db) => {
    router.post("/booking", async (req, res) => {
        try {
            const { body } = req
            db.collection("booking").insertOne({ ...body, time: new Date() })
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

    router.delete("/booking/:id", async (req, res) => {
        try {
          const { id } = req.params;
      
          const deleteResult = await db.collection("booking").deleteOne({ _id: new ObjectId(id) });
      
          if (deleteResult.deletedCount === 1) {
            res.status(200).json({ message: "ลบข้อมูลการจองเรียบร้อยแล้ว" });
          } else {
            res.status(404).json({ message: "ไม่พบข้อมูลการจองที่ต้องการลบ" });
          }
        } catch (error) {
          console.log(error.message);
          res.sendStatus(500);
        }
      });
      
      router.put("/booking/:id", async (req, res) => {
        try {
          const { id } = req.params;
          const { body } = req;
          console.log(body);
          
          const updatedBooking = await db.collection("booking").findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { ...body} },
          );
      
          if (updatedBooking.value) {
            res.status(200).json(updatedBooking.value);
          } else {
            res.status(404).json({ message: "ไม่พบข้อมูลการจองที่ต้องการแก้ไข" });
          }
        } catch (error) {
          console.log(error.message);
          res.sendStatus(500);
        }
      });
      
      
      router.get("/booking/:id", async (req, res) => {
        try {
          const { id } = req.params;
      
          const booking = await db.collection("booking").findOne({ _id: new ObjectId(id) });
      
          if (booking) {
            res.status(200).json(booking);
          } else {
            res.status(404).json({ message: "ไม่พบข้อมูลการจองที่ต้องการ" });
          }
        } catch (error) {
          console.log(error.message);
          res.sendStatus(500);
        }
      });
      


    return router;
};