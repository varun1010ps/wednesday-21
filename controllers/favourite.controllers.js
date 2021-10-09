const Favourite = require("../models/favourite.models");

function getAllFavorite (req, res) {
  if (!req.query.email) return res.send({status: "failed", query: "Email", message: "Email is required"})
  let query = {}
  let page = -1
  var sortValue = 'createdOn'
  var sort = 0
  var limit = 10
  if (req.query.limit) limit = Number(req.query.limit)
  if (req.query.page) page = req.query.page
  if (req.query.type) query.type = req.query.type
  if (req.query.email) query.email = req.query.email
  Favourite.paginate(query, {page: page, sort: { [sortValue]: sort}, limit: limit}, (err, success) => {
    if (err) return res.send({ status: "error", message: err })
    if (!success) return res.send({ status: "failed", message: "No record found" })
    return res.send({ status: "success", message: success })
  })
}

function addFavorite (req, res) {
  console.log(req.body)
  if (!req.body.email) return res.send({status: "failed", path: "question", message: "Email is required"})
  if (!req.body.type) return res.send({status: "failed", path: "type", message: "Type is required"})
  if (isNaN(req.body.type))return res.send({status: "failed", path: "type", message: "Type is must be number"})
  if (!req.body.slug)  return res.send({status: "failed", path: "slug", message: "_id of story or session is required"})
  if (!req.body.title) return res.send({status: "failed", path: "title", message: "Title is required"})
  if (!req.body.description) return res.send({status: "failed", path: "description", message: " description is required"})
  if (!req.body.imageUrl) return res.send({status: "failed", path: "imageUrl", message: "Image Url is required"})
  if (!req.body.audioFile) return res.send({status: "failed", path: "audioFile", message: "Audio url is required"})
  Favourite.findOne({slug: req.body.slug}, (err, result) => {
    if (err) return res.send({ status: "error", message: err })
    if (!result) {
      const favourite = new Favourite(req.body)
      favourite.save((err, success) => {
        if (err) return res.send({ status: "error", message: err })
        return res.send({ status: "success", message: success })
      })
    }
    else res.send({ status: "success", message: "Already Exist" })
  })
}

function removeFavorite (req, res) {
  if (!req.body._id) return res.send({status: "failed", path: "_id", message: "_id is required"})
  Favourite.remove({_id: req.body._id}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: "Record Deleted"})
  })
}

function getFavourite (req, res) {
  if (!req.query._id) return res.send({status: "failed", query: "_id", message: "_id is required"})
  Favourite.findOne({_id: req.query._id}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: success})
  })
}

function isFavorite (req, res) {
  if (!req.body.slug) return res.send({status: "failed", path: "slug", message: "slug is required"})
  if (!req.body.type) return res.send({status: "failed", path: "type", message: "type is required"})
  Favourite.findOne({slug: req.body.slug, type: req.body.type}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    if (!success) return res.send({status: "failed", message: "Not favorite"})
    return res.send({status: "success", message: success})
  })
}

module.exports = {
  getAllFavorite,
  addFavorite,
  removeFavorite,
  getFavourite,
  isFavorite
}
