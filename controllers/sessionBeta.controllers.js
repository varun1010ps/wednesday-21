const SessionBeta = require("../models/sessionsBeta.model");
const SessionBetaItem = require("../models/sessionsBetaItem.model");

function getAllSessionBeta (req, res) {
  let query = {}
  let page = -1
  var sortValue = 'createdOn'
  var sort = 0
  var limit = 10
  if (req.query.limit) limit = Number(req.query.limit) 
  if (req.query.page) page = req.query.page
  if (req.query.themeId) query.themeId = req.query.themeId
  SessionBeta.paginate(query, {page: page, sort: { [sortValue]: sort }, limit: limit}, (err, success) => {
    if (err) return res.send({ status: "error", message: err })
    if (!success) return res.send({ status: "failed", message: "No record found" })
    return res.send({ status: "success", message: success })
  })

}

function addSessionBeta (req, res) {
  if (!req.body.imageUrl) return res.send({status: "failed", path: "imageUrl", message: "Image Url is required"})
  if (!req.body.title) return res.send({status: "failed", path: "title", message: "Title is required"})
  const sessionBeta = new SessionBeta(req.body)
  sessionBeta.save((err, success) => {
    if (err) return res.send({ status: "error", message: err })
    return res.send({ status: "success", message: success })
  })
}

function updateSessionBeta (req, res) { 
  if (!req.body._id) return res.send({status: "failed", path: "_id", message: "_id is required"})
  let query = {}
  if (req.body.title) query.title = req.body.title
  if (req.body.description) query.description = req.body.description
  if (req.body.audioFile) query.audioFile = req.body.audioFile
  if (req.body.imageUrl) query.title = req.body.imageUrl
  SessionBeta.findOneAndUpdate({_id: req.body._id}, {$set: query}, {new: true}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: success})
  })
}

function removeSessionBeta (req, res) {
  if (!req.body._id) return res.send({status: "failed", path: "_id", message: "_id is required"})
  SessionBeta.remove({_id: req.body._id}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: "Record Deleted"})
  })
}

function getSessionBeta (req, res) {
  if (!req.query._id) return res.send({status: "failed", query: "_id", message: "_id is required"})
  SessionBeta.findOne({_id: req.query._id}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: success})
  })
}

function addSessionBetaItem (req, res) {
  if (!req.body._id) return res.send({status: "failed", path: "_id", message: "_id is required"})   
  if (!req.body.imageUrl) return res.send({status: "failed", path: "imageUrl", message: "Image Url is required"})
  if (!req.body.audioFile) return res.send({status: "failed", path: "audioFile", message: "Audio File is required"})
  if (!req.body.title) return res.send({status: "failed", path: "title", message: "Title is required"})
  if (!req.body.description) return res.send({status: "failed", path: "description", message: "description is required"})
  SessionBeta.findOne({_id: req.body._id}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    if (!success) return res.send({status: "failed", message: "Need to create topic first"})
    let payload = {
      parentSessionId: req.body._id,
      parentSessionBeta: success.title,
      imageUrl: req.body.imageUrl,
      title: req.body.title,
      description: req.body.description,
      audioFile: req.body.audioFile
    }
    var sessionBetaItem =  new SessionBetaItem (payload)
    sessionBetaItem.save ((err, saved) => {
      if (err) return res.send({status: "error", message: err})
      SessionBeta.update({_id: req.body._id}, {$inc: {count: 1}}, (err, update) => {
        if (err) return res.send({status: "error", message: err})
        return res.send({status: "success", message: saved})
      })
    })
  })
}

// Complete when i can work on dashboard
function updateSessionBetaItems (req, res) {

}

function deleteSessionBetaItems (req, res) {

}

function getAllSessionBetaItems (req, res) {
  if (!req.query._id) return res.send({status: "failed", query: "_id", message: "_id is required"})   
  SessionBeta.findOne({_id: req.query._id}, (err, session) => {
    if (err) return res.send({status: "error", message: err})
    if (!session) return res.send({status: "failed", message: "Need to create topic first"})
    SessionBetaItem.find({parentSessionId: session._id}, (err, success) => {
      if (err) return res.send({status: "error", message: err})
      var results = session.toJSON()
      results.items = success
      return res.send({status: "success", message: results})
    })
  })
}


module.exports = {
  getAllSessionBeta,
  addSessionBeta,
  updateSessionBeta,
  removeSessionBeta,
  getSessionBeta,
  addSessionBetaItem,
  getAllSessionBetaItems
}