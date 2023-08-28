const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// controller
const {
  createUser,
  updateUser,
  getUsers,
  deleteUser,
  getUser
} = require("./controllers/userController");

const {
  createAdmin,
  loginAdmin
} = require('./controllers/adminController')

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:123@cluster0.xjb2njt.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// User
app.get("/users", getUsers);
app.get("/users/:id", getUser);
app.post("/create", createUser);
app.put("/update/:id", updateUser);
app.delete("/delete/:id", deleteUser);

// Admin
app.post("/register", createAdmin)
app.post("/login", loginAdmin)


app.listen(5000, () => {
  console.log("Server is running");
});
