const express = require("express");
const router = express.Router();
const servicesController = require("../controllers/servicesController");

router.get("/:serviceName", servicesController.getServiceByName);
router.get("/", servicesController.getAllServices);
router.post("/", servicesController.createService);
router.put("/:serviceName", servicesController.updateService);
router.patch("/:serviceName", servicesController.patchService);
router.delete("/:serviceName", servicesController.deleteService);

module.exports = router;
