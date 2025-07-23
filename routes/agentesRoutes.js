const express = require('express');
const router = express.Router();
const agentesController = require("../controllers/agentesController");

router.get("/", agentesController.getAllAgentes);
router.get("/:id", agentesController.getAgenteById);
router.post("/", agentesController.createAgente);
router.put("/:id", agentesController.completeUpdateAgente);
router.patch("/:id", agentesController.updateCargoAgente);
router.delete("/:id", agentesController.deleteAgente);

module.exports = router;