const express = require("express");
const router = express.Router();
const fileControllers = require("../controllers/fileControllers");

router.get("/turkish-cv.pdf", fileControllers.downloadTrCvPdf);
router.get("/english-cv.pdf", fileControllers.downloadEnCvPdf);


module.exports = router;
