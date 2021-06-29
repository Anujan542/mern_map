const Pin = require("../model/Pin");
const asyncHandler = require("express-async-handler");

/// create location ===> /api/pin
exports.createPin = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;

  const pin = await Pin.create(req.body);

  res.status(200).json(pin);
});

/// get all pins
exports.getAllPins = asyncHandler(async (req, res) => {
  const pins = await Pin.find().populate("user", "username");

  if (pins) {
    res.status(200).json(pins);
  } else {
    res.status(401).json({ message: "Not found" });
  }
});
