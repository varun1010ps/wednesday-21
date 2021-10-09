const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Token = require("../models/usertoken.model");
const key = require("../config/key");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: "Your email is required",
      trim: true,
    },

    password: {
      type: String,
      required: "Your password is required",
      max: 100,
    },

    firstName: {
      type: String,
      required: "First Name is required",
      max: 100,
    },

    lastName: {
      type: String,
      required: "Last Name is required",
      max: 100,
    },
    image: {
      type: String,
      defualt: ''
    },
    accountType: {
      type: String,
      enum: ["Personal", "Organization"],
      default: "Personal",
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    orgName: {
      type: String,
      default: "Heroic Minds",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    stripeCustId: {
      type: String,
    },
    age: {
      type: Number,
    },
    town: {
      type: String,
    },
    country: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
  };

  return jwt.sign(payload, key.secret, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};

userSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

userSchema.methods.generateVerificationToken = function () {
  let payload = {
    userId: this._id,
    token: crypto.randomBytes(20).toString("hex"),
  };

  return new Token(payload);
};

const Modelclass = mongoose.model("Users", userSchema);

//Export the model
module.exports = Modelclass;
