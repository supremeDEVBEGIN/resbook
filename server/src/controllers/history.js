const express = require('express')
const router = express.Router()
const { ObjectId } = require("mongodb");

exports.history = (db) =>{
    router.get('/history/:id', async (req,res)=>{
        let {id} = req.params
        let data = await db.collection('booking').find({customer:id}).toArray()
        res.status(200).json(data)
    })

    router.delete('/history/:id', async (req, res) => {
        try {
            let { id } = req.params;
            await db.collection('booking').deleteOne({ _id: new ObjectId(id) });

            res.status(200).json({ message: 'ลบการจองเรียบร้อยแล้ว' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบ' });
        }
    });

    return router;
}

