const Stories = require("../models/stories.model");

function getAllStories (req, res) {
  let query = {}
  let page = -1
  var sortValue = 'createdOn'
  var sort = 0
  var limit = 10
  if (req.query.limit) limit = Number(req.query.limit) 
  if (req.query.page) page = req.query.page
  if (req.query.themeId) query.themeId = req.query.themeId
  Stories.paginate(query, {page: page, sort: { [sortValue]: sort }, limit: limit}, (err, success) => {
    if (err) return res.send({ status: "error", message: err })
    if (!success) return res.send({ status: "failed", message: "No record found" })
    return res.send({ status: "success", message: success })
  })

}

function addStories (req, res) {
  if (!req.body.imageUrl) return res.send({status: "failed", path: "imageUrl", message: "Image Url is required"})
  if (!req.body.title) return res.send({status: "failed", path: "title", message: "Title is required"})
  const stories = new Stories(req.body)
  stories.save((err, success) => {
    if (err) return res.send({ status: "error", message: err })
    return res.send({ status: "success", message: success })
  })
}

function updateStories (req, res) { 
  if (!req.body._id) return res.send({status: "failed", path: "_id", message: "_id is required"})
  let query = {}
  if (req.body.title) query.title = req.body.title
  if (req.body.description) query.description = req.body.description
  if (req.body.audioFile) query.audioFile = req.body.audioFile
  if (req.body.imageUrl) query.title = req.body.imageUrl
  Stories.findOneAndUpdate({_id: req.body._id}, {$set: query}, {new: true}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: success})
  })
}

function removeStories (req, res) {
  if (!req.body._id) return res.send({status: "failed", path: "_id", message: "_id is required"})
  Stories.remove({_id: req.body._id}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: "Record Deleted"})
  })
}

function getStories (req, res) {
  if (!req.query._id) return res.send({status: "failed", query: "_id", message: "_id is required"})
  Stories.findOne({_id: req.query._id}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: success})
  })
}

module.exports = {
  getAllStories,
  addStories,
  updateStories,
  removeStories,
  getStories
}