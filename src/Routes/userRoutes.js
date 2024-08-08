const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userController');

router.get("/", UserController.getAllUsers);
router.get("/profile", UserController.getUserProfile);

module.exports = router;
