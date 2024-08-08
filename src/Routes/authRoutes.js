const express = require("express");
const router = express.Router();

const AuthController = require("../Controllers/authController");

router.post("/signup", AuthController.register);
router.post("/signin", AuthController.login);

module.exports = router;
