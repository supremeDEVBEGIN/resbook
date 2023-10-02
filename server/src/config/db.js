const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        const client = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = client.db(); // ดึงฐานข้อมูลจาก MongoClient

        return db;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB
