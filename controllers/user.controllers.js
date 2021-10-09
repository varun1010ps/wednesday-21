const User = require("../models/user.models");
const key = require("../config/key");
const stripe = require("stripe")(key.stripeSecretkey);
const Org = require("../models/Organization.models");
const Token = require("../models/usertoken.model");
const { sendEmail } = require("../services/sendgrid");
const { Verification } = require("../template/VerificationEmail");

const Keys = require("../config/key");

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = async (req, res) => {
  const { accountType } = req.body;

  if (accountType == "Personal") {
    try {
      const { email } = req.body;

      // Make sure this account doesn't already exist
      const user = await User.findOne({ email });

      if (user)
        return res.status(401).json({
          message:
            "The email address you have entered is already associated with another account.",
        });

      const customer = await stripe.customers.create({
        name: `${req.body.firstName} ${req.body.lastName}`,
        email: `${req.body.email}`,
        description: `${req.body.accountType}`,
      });
      const newUser = new User({ ...req.body, stripeCustId: customer.id });

      const user_ = await newUser.save();

      await sendVerificationEmail(user_, req, res);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  if (accountType == "Organization") {
    const OrgID = req.body.orgId;
    const OrgCode = req.body.orgCode;
    try {
      const { email } = req.body;
      const orgId = await Org.findById(OrgID);
      if (!Org) {
        res.status(401).json({ message: "No Organization available" });
      }
      if (orgId.orgCode !== OrgCode) {
        res.status(401).json({
          message: "Invalid Organization Code ! Please Enter Valid Codes",
        });
      }
      // Make sure this account doesn't already exist
      if (orgId.orgCode === OrgCode) {
        const user = await User.findOne({ email });
        if (user)
          return res.status(401).json({
            message:
              "The email address you have entered is already associated with another account.",
          });

        const newUser = new User({
          ...req.body,
          orgId: orgId._id,
          orgName: orgId.orgName,
          stripeCustId: "Organization"
        });

        const user_ = await newUser.save();

        await sendVerificationEmail(user_, req, res);
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        message:
          "The email address " +
          email +
          " is not associated with any account. Double-check your email address and try again.",
      });

    //validate password
    if (!user.comparePassword(password))
      return res.status(401).json({ message: "Invalid email or password" });

    // Make sure the user has been verified
    if (!user.isVerified)
      return res.status(401).json({
        type: "not-verified",
        message: "Your account has not been verified.",
      });

    // Login successful, write token, and send back user
    res.status(200).json({ token: user.generateJWT(), user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===EMAIL VERIFICATION
// @route GET api/verify/:token
// @desc Verify token
// @access Public
exports.verify = async (req, res, next) => {
  if (!req.params.token)
    return res
      .status(400)
      .json({ message: "We were unable to find a user for this token." });

  try {
    // Find a matching token
    const token = await Token.findOne({ token: req.params.token });

    if (!token)
      return res.status(400).json({
        message:
          "We were unable to find a valid token. Your token my have expired.",
      });

    // If we found a token, find a matching user
    User.findOne({ _id: token.userId }, (err, user) => {
      if (!user)
        return res
          .status(400)
          .json({ message: "We were unable to find a user for this token." });

      if (user.isVerified)
        return res
          .status(400)
          .json({ message: "This user has already been verified." });

      // Verify and save the user
      user.isVerified = true;
      user.save(function (err) {
        if (err) return res.status(500).json({ message: err.message });

        res.status(200).json("The account has been verified. Please log in.");
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST api/resend
// @desc Resend Verification Token
// @access Public
exports.resendToken = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        message:
          "The email address " +
          req.body.email +
          " is not associated with any account. Double-check your email address and try again.",
      });

    if (user.isVerified)
      return res.status(400).json({
        message: "This account has already been verified. Please log in.",
      });

    await sendVerificationEmail(user, req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function sendVerificationEmail(user, req, res) {
  try {
    const token = user.generateVerificationToken();

    // Save the verification token
    await token.save();

    let subject = "Account Verification Token";
    let to = user.email;
    let from = Keys.fromEmail;
    let link = "http://18.218.95.114:5080/api/v1/verify/" + token.token;
    let html = Verification(user.firstName, link);

    await sendEmail({ to, from, subject, html });

    res.status(200).json({
      message: "A verification email has been sent to " + user.email + ".",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.recover = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        message:
          "The email address " +
          req.body.email +
          " is not associated with any account. Double-check your email address and try again.",
      });

    //Generate and set password reset token
    user.generatePasswordReset();

    // Save the updated user object
    await user.save();

    // send email
    let subject = "Password change request";
    let to = user.email;
    let from = Keys.fromEmail;
    let link =
      "http://" + req.headers.host + "/api/v1/reset/" + user.resetPasswordToken;
    let html = `<p>Hi ${user.firstName}</p>
                  <p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
                  <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

    await sendEmail({ to, from, subject, html });

    res
      .status(200)
      .json({ message: "A reset email has been sent to " + user.email + "." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
exports.reset = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(401)
        .json({ message: "Password reset token is invalid or has expired." });

    //Redirect user to form with the email address
    res.render("reset", { user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(401)
        .json({ message: "Password reset token is invalid or has expired." });

    //Set the new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.isVerified = true;

    // Save the updated user object
    await user.save();

    let subject = "Your password has been changed";
    let to = user.email;
    let from = Keys.fromEmail;
    let html = `<p>Hi ${user.firstName}</p>
                  <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`;

    await sendEmail({ to, from, subject, html });

    res.status(200).json({ message: "Your password has been updated." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST api/auth/reset
// @desc Reset Password
// @access Public

exports.getallUser = async (req, res, next) => {
  try {
    const user = await User.find({}, { __v: 0 });
    if (user) {
      res.json(user);
    } else {
      res.json({ message: "No User available" });
    }
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
};


exports.findUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const findUser = await User.findById(id);
    if (!findUser) {
      res.json({ message: "This User does not exist" });
    } else {
      res.json(findUser);
    }
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
};

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      res.json({ message: "This User does not exist" });
    }
    res.json(deleteUser);
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
};

exports.updateUser = (req, res) => {
  if (!req.body.email) return res.send({status: "failed", body: "email", message: "email is required"})
  const email = req.body.email
  let query = {}
  if (req.body.firstName) query.firstName = req.body.firstName
  if (req.body.lastName) query.lastName = req.body.lastName
  if (req.body.image) query.image = req.body.image
  if (req.body.age) query.age = req.body.age
  if (req.body.town) query.town = req.body.town
  if (req.body.country) query.country = req.body.country
  User.findOneAndUpdate({email: email}, {$set: query}, {new: true}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: success})
  })
} ;


exports.updateImage = (req, res) => {
  if (!req.body.email) return res.send({status: "failed", body: "email", message: "email is required"})
  const email = req.body.email
  let query = {}
  if (req.body.image) query.image = req.body.image
  User.findOneAndUpdate({email: email}, {$set: query}, {new: true}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: success})
  })
} ;