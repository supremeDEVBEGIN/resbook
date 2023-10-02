const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = (db) => {
    const saltRounds = 10;
    router.post('/register', async (req, res) => {
        const { name, email, password, tel } = req.body
        try {
            switch (true) {
                case !name:
                    return res.status(422).json({ ErrorMessage: "กรุณาป้อนเพื่อสมัครสมาชิก" })
                    break;
                case !email:
                    return res.status(422).json({ ErrorMessage: "กรุณาป้อนอีเมลเพื่อสมัครสมาชิก" })
                    break;
                case !password:
                    return res.status(422).json({ ErrorMessage: "กรุณาป้อนรหัสผ่านเพื่อสมัครสมาชิก" })
                    break;
                case !tel:
                    return res.status(422).json({ ErrorMessage: "กรุณาป้อนเบอร์โทรศัพท์เพื่อสมัครสมาชิก" })
                    break;
            }

            const user = await db.collection('users').findOne({
                "$or": [
                    { 'name': name }, { 'tel': tel }]
            })
            if (user) {
                return res.status(422).json({ ErrorMessage: "อีเมลหรือโทรศัพท์ถูกใช้งานแล้ว" })
            }

            const hash = await bcrypt.hash(password, saltRounds)
            db.collection('users').insertOne(
                {
                    name: name,
                    password: hash,
                    email: email.toLowerCase(),
                    tel: tel,
                    level: 'user',
                    addBy: 'register'
                },
            )
                .then((data) => {
                    return res.status(200).json({ SuccessMessage: "การสมัครเสร็จสิ้น" })
                }).catch(err => {
                    console.log(err);
                    return res.status(422).json({ ErrorMessage: "มีปัญหาที่ฐานข้อมูล" })
                })
        } catch (error) {
            console.log(error);
            return res.status(422).json({ ErrorMessage: "ค้นหาไม่พบข้อมูลและไม่เพิ่มลงฐานข้อมูล" })
        }

    })

    return router
}

exports.login = (db) => {
    router.post('/login', async (req, res) => {
        const { name, password } = req.body
        switch (true) {
            case !name:
                return res.status(400).json({ ErrorMessage: "กรุณาป้อนเบอร์โทรศัพท์ในการเข้าสู่ระบบ" })
                break;
            case !password:
                return res.status(400).json({ ErrorMessage: "กรุณาป้อนรหัสผ่านเพื่อเข้าสู่ระบบ" })
                break;
        }

        const user = await db.collection('users').findOne({ 'name': name })
        if (!user) {
            return res.status(403).json({ message: "ไม่พบข้อมูลของผู้ใช้" })
        }
        const result = await bcrypt.compare(password, user.password)

        if (result) {
            const token = jwt.sign({
                _id: user._id,
                username: user.name,
                level: user.level
            }, process.env.TOKEN_SECRET,
                { expiresIn: '1d' })
            res.setHeader("token", token)
            res.setHeader("Set-Cookie", "token=" + token);
            return res.status(200).json({
                user: user.name,
                token: token,
                level: user.level,
                tel: user.tel,
                email: user.email
            })
        } else {
            return res.status(400).json({ ErrorMessage: `รหัสผ่านไม่ถูกต้อง` })
        }

    })
    return router
}

exports.profile = (db) => {
    router.get('/profile/:id', async (req, res) => {
        const { id } = req.params
        await db.collection('users').findOne({ "tel": id })
            .then((result) => {
                if (result) {
                    const { name, email, tel } = result
                    return res.status(200).json({
                        name: name,
                        email: email,
                        tel: tel
                    });
                } else {
                    return res.status(404).json({
                        ErrorMessage: "ไม่พบข้อมูลผู้ใช้"
                    });
                }
            }).catch((err) => {
                return res.status(403).json(err);
            });
    })
    return router
}

exports.editProfile = (db) => {
    router.put('/editprofile/:id', async (req, res) => {
        const { id } = req.params;
        const { name, email, tel } = req.body;

        try {
            // ตรวจสอบว่ามีข้อมูลที่จำเป็นถูกส่งมาหรือไม่
            if (!name || !email || !tel) {
                return res.status(400).json({
                    ErrorMessage: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน"
                });
            }

            // อัพเดตข้อมูลโปรไฟล์ในฐานข้อมูล
            const result = await db.collection('users').findOneAndUpdate(
                { "tel": id },
                {
                    $set: {
                        name: name,
                        email: email,
                        tel: tel,
                    }
                },
                { returnOriginal: false } // เพื่อให้คืนค่าข้อมูลที่ถูกอัพเดต
            );

            // ตรวจสอบว่ามีการอัพเดตข้อมูลโปรไฟล์หรือไม่
            if (result.value) {
                return res.status(200).json({
                    data: result.value,
                    SuccessMessage: `อัพเดตข้อมูลโปรไฟล์ ${name} เรียบร้อย`
                });
            } else {
                return res.status(404).json({
                    ErrorMessage: "ไม่พบข้อมูลโปรไฟล์ที่ต้องการอัพเดต"
                });
            }
        } catch (error) {
            return res.status(500).json({
                ErrorMessage: "มีปัญหาในการอัพเดตข้อมูลโปรไฟล์"
            });
        }
    });
    return router;
}




