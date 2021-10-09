const Admin = require("../models/admin.models");

// @route POST api/auth/register
// @desc Register admin
// @access Public
exports.register = async (req, res) => {
  try {
    const { email } = req.body;

    // Make sure this account doesn't already exist
    const admin = await Admin.findOne({ email });

    if (admin)
      return res.status(401).json({
        message:
          "The email address you have entered is already associated with another account.",
      });

    const newUser = new Admin({ ...req.body });

    const admin_ = await newUser.save();

    res.status(200).json({ admin: admin_ });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// @route POST api/auth/login
// @desc Login admin and return JWT token
// @access Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin)
      return res.status(401).json({
        msg:
          "The email address " +
          email +
          " is not associated with any account. Double-check your email address and try again.",
      });

    //validate password
    if (!admin.comparePassword(password))
      return res.status(401).json({ message: "Invalid email or password" });

    // Login successful, write token, and send back admin
    res.status(200).json({ token: admin.generateJWT(), admin: admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
