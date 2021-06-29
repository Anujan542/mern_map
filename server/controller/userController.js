const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/generateToken");

///register === > /api/user/register
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const emailExist = await User.findOne({ email });

  if (emailExist) {
    res.status(401).json({ message: "This email already exist" });
  }
  const userCheck = await User.findOne({ username });

  if (userCheck) {
    res.status(401).json({ message: "This username already exist" });
  }
  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "not found" });
  }
});

//login === > /api/user/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "This email does not exist" });
  }

  if (user && (await user.isMatch(password))) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});
