const Org = require("../models/Organization.models");

exports.getallOrg = async (req, res, next) => {
  try {
    const organizations = await Org.find({}, { __v: 0 });
    if (organizations) {
      res.json(organizations);
    } else {
      res.json({ message: "No organizations available" });
    }
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
};

exports.createOrg = async (req, res, next) => {
  const org = new Org({
    orgName: req.body.orgName,
    orgCode: req.body.orgCode,
  });
  try {
    const checkOrgName = await Org.findOne({
      orgName: req.body.orgName,
    });
    if (checkOrgName) {
      res.json({
        message: "Please Try Different Org name, Its already Exists!",
      });
    } else {
      const newOrg = await org.save();
      res.json(newOrg);
    }
  } catch (err) {
    res.json({ message: err.message, status: "error" });
  }
};

exports.findOrgById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const findOrg = await Org.findById(id);
    if (!findOrg) {
      res.json({ message: "This Org does not exist" });
    } else {
      res.send(findOrg);
    }
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
};

exports.updateOrg = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updates = req.body;
    const options = { new: true };
    const findOrg = await Org.findByIdAndUpdate(id, updates, options);
    if (!findOrg) {
      res.json({ message: "This Org does not exist" });
    }
    res.send(findOrg);
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
};

exports.deleteOrg = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteOrg = await Org.findByIdAndDelete(id);
    if (!deleteOrg) {
      res.json({ message: "This Org does not exist" });
    }
    res.json(deleteOrg);
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
};
