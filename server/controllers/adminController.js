const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

exports.createAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    const saveAdmin = await newAdmin.save();
    res.status(201).json(saveAdmin);
  } catch (err) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการสร้าง admin" });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (admin) {
      if (admin.password === password) {
        const token = jwt.sign({ username: admin.username }, "MERN-Stack");
        res.json({ token });
      }
    }
  } catch (err) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ admin" });
  }
};
