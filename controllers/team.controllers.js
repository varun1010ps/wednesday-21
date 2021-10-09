const Team = require("../models/teamAccess.model");

exports.getallTeam = async (req, res, next) => {
    try {
        const team = await Team.find({}, { __v: 0 });
        if (team) {
            res.json(team);
        }
        else {
            res.json({ message: 'No team available' })
        }

    } catch (error) {
        res.json({ message: error.message, status: "error" });
    }
}

exports.createTeam = async (req, res, next) => {
    const team = new Team({
        name: req.body.name,
        email: req.body.email,
        company: req.body.company,
        noOfUser: req.body.noOfUser,
        message: req.body.message,
    });
    try {

        const newTeam = await team.save();
        res.json(newTeam);

    } catch (error) {
        res.json({ message: error.message, status: "error" });
    }
}

exports.findTeamById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const findTeam = await Team.findById(id);
        if (!findTeam) {
            res.json({ message: 'This Team does not exist' });
        }
        else {
            res.send(findTeam);
        }
    } catch (error) {
        res.json({ message: error.message, status: "error" });
    }
};

exports.updateTeam = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updates = req.body;
        const options = { new: true };
        const findTeam = await Team.findByIdAndUpdate(id, updates, options);
        if (!findTeam) {
            res.json({ message: 'This Team does not exist' });
        }
        res.send(findTeam);
    } catch (error) {
        res.json({ message: error.message, status: "error" });
    }
};

exports.deleteTeam = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deleteTeam = await Team.findByIdAndDelete(id);
        if (!deleteTeam) {
            res.json({ message: 'This Team does not exist' });
        }
        res.json(deleteTeam);
    } catch (error) {
        res.json({ message: error.message, status: "error" });
    }
};