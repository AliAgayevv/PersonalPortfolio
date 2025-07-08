const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/login", adminController.login);
router.get("/protected", adminController.verifyToken, (req, res) => {
  res.status(200).json({
    message: "You have access to this protected route",
    user: req.user,
  });
});

module.exports = router;
