const Episode = require("../models/episode.models");
const Topic = require("../models/topic.models");
const Theme = require("../models/theme.models");

exports.getallEpisode = async (req, res, next) => {
  try {
    const Episodes = await Episode.find({}, { __v: 0 }).sort({createdOn:-1})
    if (Episodes) {
      res.json(Episodes);
    } else {
      res.json({ message: "No Episodes available" });
    }
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
};

exports.createEpisode = async (req, res, next) => {
  const TopicID = req.body.topicId;
  const Theme1ID = req.body.theme1Id;
  const Theme2ID = req.body.theme2Id;
  const Theme3ID = req.body.theme3Id;
  try {
    const topicId = await Topic.findById(TopicID);
    const theme1Id = await Theme.findById(Theme1ID);
    const theme2Id = await Theme.findById(Theme2ID);
    const theme3Id = await Theme.findById(Theme3ID);
    if (!Topic) {
      res.json({ message: "No Topic available" });
    }
    if (!Theme) {
      res.json({ message: "No Theme available" });
    }
    const episode = new Episode({
      title: req.body.title,
      topicId: topicId._id,
      topic: topicId.title,
      theme1: theme1Id.theme,
      theme1Id: theme1Id._id,
      theme2: theme2Id.theme,
      theme2Id: theme2Id._id,
      theme3: theme3Id.theme,
      theme3Id: theme3Id._id,
      imageUrl: req.body.imageUrl,
      audioFile: req.body.audioFile,
      description: req.body.description,
      journal1 : req.body.journal1, 
      journal2 : req.body.journal2, 
    });
    const newEpisode = await episode.save();
    res.json(newEpisode);
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
};

exports.findEpisodeById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const findEpisode = await Episode.findById(id);
    if (!findEpisode) {
      res.json({ message: "This Episode does not exist" });
    } else {
      res.json(findEpisode);
    }
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
};

exports.updateEpisode = async (req, res, next) => {
  const id = req.params.id;
  const TopicID = req.body.topicId;
  const Theme1ID = req.body.theme1Id;
  const Theme2ID = req.body.theme2Id;
  const Theme3ID = req.body.theme3Id;
  try {
    const topicId = await Topic.findById(TopicID);
    const theme1Id = await Theme.findById(Theme1ID);
    const theme2Id = await Theme.findById(Theme2ID);
    const theme3Id = await Theme.findById(Theme3ID);
    const updates = {
      title: req.body.title,
      topicId: topicId._id,
      topic: topicId.title,
      theme1: theme1Id.theme,
      theme1Id: theme1Id._id,
      theme2: theme2Id.theme,
      theme2Id: theme2Id._id,
      theme3: theme3Id.theme,
      theme3Id: theme3Id._id,
      imageUrl: req.body.imageUrl,
      audioFile: req.body.audioFile,
      description: req.body.description,
      journal1 : req.body.journal1, 
      journal2 : req.body.journal2, 
    }
    const options = { new: true };
    const findEpisode = await Episode.findByIdAndUpdate(id, updates, options);
    if (!Topic) {
      res.json({ message: "No Topic available" });
    }
    if (!Theme) {
      res.json({ message: "No Theme available" });
    }
    if (!findEpisode) {
      res.json({ message: "This Episode does not exist" });
    }
    res.json(findEpisode);
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
};

exports.deleteEpisode = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteEpisode = await Episode.findByIdAndDelete(id);
    if (!deleteEpisode) {
      res.json({ message: "This Episode does not exist" });
    }
    res.json(deleteEpisode);
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
};
