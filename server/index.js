const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// controller
const {
  createUser,
  updateUser,
  getUsers,
  deleteUser,
} = require("./controllers/userController");

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

app.get("/", getUsers);
app.post("/create", createUser);
app.put("/update/:id", updateUser);
app.delete("/delete/:id", deleteUser);

app.listen(5000, () => {
  console.log("Server is running");
});
