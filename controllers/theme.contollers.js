const Theme = require("../models/theme.models");

exports.getallTheme = async (req, res, next) => {
    try {
        const themes = await Theme.find({}, { __v: 0 });
        if (themes) {
            res.json(themes);
        }
        else { res.json({ message: 'No themes available' })
        }

    } catch (error) {
        res.json({ message: error.message, status: "error" });
    }
}

exports.createTheme = async (req, res, next) => {
    const theme = new Theme({
        theme: req.body.theme,
    });
    try {
        const findTheme = await Theme.find();
        if (findTheme.theme === theme) {
            res.json({ message: 'This theme already exists' });
        }
        else {
            const newTheme = await theme.save();
            res.json(newTheme);
        }
    } catch (error) {
        res.json({ message: error.message, status: "error" });
    }
}

exports.findThemeById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const findTheme = await Theme.findById(id);
        if (!findTheme) {
            res.json({ message: 'This theme does not exist' });
        }
        else{
            res.send(findTheme);
        }
    } catch (error) {
        res.json({ message: error.message, status: "error" });
    }
};

exports.updateTheme = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updates = req.body;
        const options = { new: true };
        const findTheme = await Theme.findByIdAndUpdate(id, updates, options);
        if (!findTheme) {
            res.json({ message: 'This theme does not exist' });
        }
        res.send(findTheme);
    } catch (error) {
        res.json({ message: error.message, status: "error" });
    }
};

exports.deleteTheme = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deleteTheme = await Theme.findByIdAndDelete(id);
        if (!deleteTheme) {
            res.json({ message: 'This theme does not exist' });
        }
        res.json(deleteTheme);
    } catch (error) {
        res.json({ message: error.message, status: "error" });
    }
};