const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection is Successfuly"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", projectRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is Running");
});
