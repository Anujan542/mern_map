const express = require("express");
const { createPin, getAllPins } = require("../controller/pinController");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(getAllPins).post(protect, createPin);

module.exports = router;
