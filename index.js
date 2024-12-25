const sendMailRoutes = require("./routes/sendMailRoutes");
const projectRoutes = require("./routes/projectRoutes");
const fileRoutes = require("./routes/fileRoutes");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const path = require('path');
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection is Successfuly"))
  .catch((err) => {
    console.log(err);
});



app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/mail", sendMailRoutes);



app.listen(process.env.PORT || 5000, () => {
  console.log("Server is Running");
});
