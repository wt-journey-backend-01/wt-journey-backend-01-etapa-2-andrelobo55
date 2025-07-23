const express = require('express');
const casosController = require("../controllers/casosController");
const router = express.Router();

router.get("/", casosController.getAllCasos);
router.get("/:id", casosController.getCasoById);
router.post("/", casosController.createCaso);
router.put("/:id", casosController.completeUpdateCaso);
router.patch("/:id", casosController.updateTituloCaso);
router.delete("/:id", casosController.deleteCaso);

module.exports = router;