const express = require("express");
const router = express.Router();
const sendMailController = require("../controllers/sendMailController");

router.post("/contact", sendMailController.saveMessage);

module.exports = router;
