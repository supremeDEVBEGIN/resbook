const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

exports.createUser = (db) => {
    const saltRounds = 10;
    router.post("/admin-create", async (req, res) => {
        console.log(req.body);
        const { name, email, password, tel} = req.body;
        try {
            switch (true) {
                case !name || name === "" || name === null:
                    return res
                        .status(422)
                        .json({ ErrorMessage: "กรุณาป้อนชื่อเพื่อสมัครสมาชิก" });
                    break;
                case !email || email === "" || email === null:
                    return res
                        .status(422)
                        .json({ ErrorMessage: "กรุณาป้อนอีเมลเพื่อสมัครสมาชิก" });
                    break;
                case !password || password === "" || password === null:
                    return res
                        .status(422)
                        .json({ ErrorMessage: "กรุณาป้อนรหัสผ่านเพื่อสมัครสมาชิก" });
                    break;
                case !tel || tel === "" || tel === null:
                    return res
                        .status(422)
                        .json({ ErrorMessage: "กรุณาป้อนเบอร์โทรศัพท์เพื่อสมัครสมาชิก" });
                    break;
            }

            const user = await db.collection("users").findOne({
                $or: [{ name: name }, { tel: tel }],
            });
            if (user) {
                return res
                    .status(422)
                    .json({ ErrorMessage: "อีเมลหรือโทรศัพท์ถูกใช้งานแล้ว" });
            }
            const hash = await bcrypt.hash(password, saltRounds);
            db.collection("users")
                .insertOne({
                    name: name,
                    password: hash,
                    email: email.toLowerCase(),
                    tel: tel,
                    level: "user",
                    addBy: "admin",
                })
                .then((data) => {
                    return res.status(200).json({ SuccessMessage: "การสมัครเสร็จสิ้น" });
                })
                .catch((err) => {
                    return res.status(422).json({ ErrorMessage: "มีปัญหาที่ฐานข้อมูล" });
                });
        } catch (error) {
            return res
                .status(422)
                .json({ ErrorMessage: "ค้นหาไม่พบข้อมูลและไม่เพิ่มลงฐานข้อมูล" });
        }
    });
    return router;
};

exports.getUsers = (db) => {
    router.get("/users", async (req, res) => {
        db.collection("users")
            .aggregate([])
            .toArray()
            .then((result) => {
                if (result.length == 0)
                    return res.status(200).json({ ErrorMessage: "ไม่มีข้อมูล" });
                else return res.status(200).json(result);
            })
            .catch((err) => {
                return res.status(400).json({ ErrorMessage: "ไม่พบข้อมูล" });
            });
    });
    return router;
};

exports.getUserById = (db) => {
    router.get("/user/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const user = await db.collection("users")
            .findOne({ _id: new ObjectId(id) });
            if (user) {
                return res.status(200).json({
                    name: user.name,
                    email: user.email,
                    tel: user.tel,
                    level: user.level,
                    addBy: user.addBy,
                });
            } else {
                return res.status(403).json({ ErrorMessage: "ไม่พบข้อมูลของผู้ใช้" });
            }
        } catch (err) {
            console.log(err.message);
            return res.status(400).json({ ErrorMessage: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้" });
        }
    });
    return router;
};

exports.updateDetailUsers = (db) => {
    const saltRounds = 10;
    router.put("/users-update/:id",async (req, res) => {
      const { id } = req.params;
      const { name, email, tel, level} =
        req.body;
      console.log(req.body);
      switch (true) {
        case !name || name === "" || name === null:
          return res
            .status(422)
            .json({ ErrorMessage: "กรุณาป้อนชื่อเพื่อสมัครสมาชิก" });
          break;
        case !email || email === "" || email === null:
          return res
            .status(422)
            .json({ ErrorMessage: "กรุณาป้อนอีเมลเพื่อสมัครสมาชิก" });
          break;
        case !tel || tel === "" || tel === null:
          return res
            .status(422)
            .json({ ErrorMessage: "กรุณาป้อนเบอร์โทรศัพท์เพื่อสมัครสมาชิก" });
          break;
        case !level || level === "" || level === null:
          return res
            .status(422)
            .json({ ErrorMessage: "กรุณาป้อนระดับของผู้ใช้" });
          break;
      }
      await db
        .collection("users")
        .findOneAndUpdate(
          { _id: new ObjectId(id) },
          {
            $set: {
              name: name,
              email: email.toLowerCase(),
              tel: tel,
              level: level,
            },
          }
        )
        .then((result) => {
          return res.status(200).json({
            SuccessMessage: "อัพเดตข้อมูลเรียบร้อย",
          });
        })
        .catch((err) => {
          return res.status(400).json({ ErrorMessage: "ไม่พบข้อมูลของผู้ใช้" });
        });
    });
    return router;
  };

  exports.deleteUserById = (db) => {
    router.delete("/users-delete/:id", async (req, res) => {
      const { id } = req.params;
      await db
        .collection("users")
        .deleteOne({ _id: new ObjectId(id) })
        .then((result) => {
          console.log(result);
          return res
            .status(200)
            .json({ SuccessMessage: `ลบข้อมูลของ ${id} เรียบร้อย` });
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(405)
            .json({ ErrorMessage: `มีปัญหากับ ${id} ไม่สามารถลบได้` });
        });
    });
    return router;
  };

