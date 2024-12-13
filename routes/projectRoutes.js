const express = require("express");
const router = express.Router();
const projetController = require("../controllers/projectControllers");

router.get("/project", projetController.getProjects);
router.get("/project/:id", projetController.getProject);
router.post("/project/addProject", projetController.addProject);
router.put("/project/update/:id", projetController.updateProject);
router.delete("/project/delete/:id", projetController.deletedProject);

module.exports = router;
