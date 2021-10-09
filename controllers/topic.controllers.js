const Topic = require("../models/topic.models");
const TopicItem = require("../models/topicItems.models");

function getAllTopic (req, res) {
  let query = {}
  let page = -1
  var sortValue = 'createdOn'
  var sort = 0
  var limit = 10
  if (req.query.limit) limit = Number(req.query.limit) 
  if (req.query.page) page = req.query.page
  if (req.query.themeId) query.themeId = req.query.themeId
  Topic.paginate(query, {page: page, sort: { [sortValue]: sort }, limit: limit}, (err, success) => {
    if (err) return res.send({ status: "error", message: err })
    if (!success) return res.send({ status: "failed", message: "No record found" })
    return res.send({ status: "success", message: success })
  })

}

function addTopic (req, res) {
  if (!req.body.imageUrl) return res.send({status: "failed", path: "imageUrl", message: "Image Url is required"})
  if (!req.body.title) return res.send({status: "failed", path: "title", message: "Title is required"})
  if (!req.body.summary) return res.send({status: "failed", path: "summary", message: "Summary is required"})
  const topic = new Topic(req.body)
  topic.save((err, success) => {
    if (err) return res.send({ status: "error", message: err })
    return res.send({ status: "success", message: success })
  })
}

function updateTopic (req, res) { 
  if (!req.body._id) return res.send({status: "failed", path: "_id", message: "_id is required"})
  let query = {}
  if (req.body.title) query.title = req.body.title
  if (req.body.summary) query.summary = req.body.summary
  if (req.body.imageUrl) query.title = req.body.imageUrl
  Topic.findOneAndUpdate({_id: req.body._id}, {$set: query}, {new: true}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: success})
  })
}

function removeTopic (req, res) {
  if (!req.body._id) return res.send({status: "failed", path: "_id", message: "_id is required"})
  Topic.remove({_id: req.body._id}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: "Record Deleted"})
  })
}

function getTopic (req, res) {
  if (!req.query._id) return res.send({status: "failed", query: "_id", message: "_id is required"})
  Topic.findOne({_id: req.query._id}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: success})
  })
}

function addTopicItem (req, res) {
  if (!req.body._id) return res.send({status: "failed", path: "_id", message: "_id is required"})   
  if (!req.body.imageUrl) return res.send({status: "failed", path: "imageUrl", message: "Image Url is required"})
  if (!req.body.title) return res.send({status: "failed", path: "title", message: "Title is required"})
  if (!req.body.summary) return res.send({status: "failed", path: "summary", message: "Summary is required"})
  Topic.findOne({_id: req.body._id}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    if (!success) return res.send({status: "failed", message: "Need to create topic first"})
    let payload = {
      parentTopicId: req.body._id,
      parentTopic: success.title,
      imageUrl: req.body.imageUrl,
      title: req.body.title,
      summary: req.body.summary
    }
    var topicItem =  new TopicItem (payload)
    topicItem.save ((err, saved) => {
      if (err) return res.send({status: "error", message: err})
      Topic.update({_id: req.body._id}, {$inc: {topicItemsCount: 1}}, (err, update) => {
        if (err) return res.send({status: "error", message: err})
        return res.send({status: "success", message: success})
      })
    })
  })
}

// Complete when i can work on dashboard
function updateTopicItems (req, res) {

}

function deleteTopicItems (req, res) {

}

function getAllTopicItems (req, res) {
  if (!req.query._id) return res.send({status: "failed", query: "_id", message: "_id is required"})   
  Topic.findOne({_id: req.query._id}, (err, topic) => {
    if (err) return res.send({status: "error", message: err})
    if (!topic) return res.send({status: "failed", message: "Need to create topic first"})
    TopicItem.find({parentTopicId: topic._id}, (err, success) => {
      if (err) return res.send({status: "error", message: err})
      var results = topic.toJSON()
      results.items = success
      return res.send({status: "success", message: results})
    })
  })
}

module.exports = {
  getAllTopic,
  addTopic,
  updateTopic,
  removeTopic,
  getTopic,
  addTopicItem,
  getAllTopicItems
}