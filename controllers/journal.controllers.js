const Journal = require("../models/journal.model");
const JournalItems = require("../models/journalItem.model");
const SessionBeta = require("../models/sessionsBeta.model");

const SessionBetaItem = require("../models/sessionsBetaItem.model");
const Stories = require("../models/stories.model");

function getAllJournal (req, res) {
  let query = {}
  let page = -1
  var sortValue = 'createdOn'
  var sort = 0
  var limit = 10
  if (req.query.limit) limit = Number(req.query.limit) 
  if (req.query.page) page = req.query.page
  if (req.query.email) query.email = req.query.email
  Journal.paginate(query, {page: page, sort: { [sortValue]: sort }, limit: limit}, (err, success) => {
    if (err) return res.send({ status: "error", message: err })
    if (!success) return res.send({ status: "failed", message: "No record found" })
    return res.send({ status: "success", message: success })
  })
}

function addJournal (req, res) {
  if (!req.body.id) return res.send({status: "failed", path: "id", message: "id is required"})
  if (!req.body.type) return res.send({status: "failed", path: "type", message: "type is required"})
  if (!req.body.email) return res.send({status: "failed", path: "email", message: "Email is required"})
  if (!req.body.title) return res.send({status: "failed", path: "title", message: "Title is required"})
  if (!req.body.description) return res.send({status: "failed", path: "description", message: " description is required"})
  if (!req.body.imageUrl) return res.send({status: "failed", path: "imageUrl", message: "Image Url is required"})
  if (!req.body.audioFile) return res.send({status: "failed", path: "audioFile", message: "Audio url is required"})
  Journal.findOne({id: req.body.id, type: req.body.type, email: req.body.email}, (err, journal) => {
    if (err) return res.send({status: "error", message: err})
    if (journal) return res.send({status: "failed", message: "Journal already exist"})
    var journalSave = new Journal(req.body)
    let bulkUpdateOps = []
    let count = 0
    req.body.journalItems.some((item) => {
      if (!item.question) return res.send({status: "failed", path: "journalItems", message: "journalItems is array, question is not exists"}) 
      if (!item.questionId) return res.send({status: "failed", path: "journalItems", message: "journalItems is array, questionId is not exists"})
      item.email = req.body.email
      item.id = req.body.id
      item.updatedAt = new Date().getTime()
      item.createdAt = new Date().getTime()
      bulkUpdateOps.push(item)
      count++
      if (req.body.journalItems.length === count) {
        journalSave.save((err, saved) => {
          if (err || !saved) return res.send({status: "error", message: err})
          JournalItems.insertMany(bulkUpdateOps, (err, success) => {
            console.log(err)
            if (err) return res.send({status: "error", message: err})
            return res.send({status: "success", message: success})
          })
        })
      }
    });
  })
}

function updateJournal (req, res) { 
  if (!req.body.id) return res.send({status: "failed", path: "id", message: "id is required"})
  if (!req.body.type) return res.send({status: "failed", path: "type", message: "type is required"})
  if (!req.body.email) return res.send({status: "failed", path: "email", message: "Email is required"})

  Journal.findOne({id: req.body.id, type: req.body.type, email: req.body.email}, (err, journal) => {
    if (err || !journal) return res.send({status: "error", message: err})
    let bulkUpdateOps = []
    let count = 0
    req.body.journalItems.some((item) => {
      if (item._id) {
        bulkUpdateOps.push({
          'updateOne': {
            'filter': {id: req.body.id, questionId: item.questionId, email: req.body.email},
            'update': {'$set': {question: item.question,
              answer: item.answer,
              updatedAt: new Date().getTime()}}
          }
        })
        count++
        if (req.body.journalItems.length === count) {
          JournalItems.bulkWrite(bulkUpdateOps, (err, success) => {
            console.log(success)
            console.log(err)
            if (err) return res.send({status: "error", message: err})
            return res.send({status: "success", message: "Record updated successfully"})
          })
        }
      }
      else {
        bulkUpdateOps.push({ 
          'updateOne': {
            'filter': {email: req.body.email, id: req.body.id, questionId: item.questionId},
            'update' : {
              question: item.question,
              answer: item.answer,
              updatedAt: new Date().getTime(),
              createdAt: new Date().getTime()
            }, 
            'upsert': true
          }
        })
        count++
        if (req.body.journalItems.length === count) {
          JournalItems.bulkWrite(bulkUpdateOps, (err, success) => {
            console.log(err)
            console.log(success)
            if (err) return res.send({status: "error", message: err})
            return res.send({status: "success", message: "Record updated successfully"})
          })
        }
      }
    });
  })
}

function removeJournal (req, res) {
  if (!req.body.id) return res.send({status: "failed", path: "_id", message: "_id is required"})
  if (!req.body.email) return res.send({status: "failed", path: "email", message: "Email is required"})
  Journal.remove({id: req.body.id, email: req.body.email}, (err, journal) => {
    if (err) return res.send({status: "error", message: err})
    JournalItems.remove({id: journal.id, email: req.body.email}, (err, success) => {
      if (err) return res.send({status: "error", message: err})
     return res.send({status: "success", message: "Records Deleted"})
    })
  })
}

function getJournal (req, res) {
  if (!req.query.id) return res.send({status: "failed", query: "id", message: "_id is required"})
  if (!req.query.email) return res.send({status: "failed", path: "email", message: "Email is required"})
  if (!req.query.type) return res.send({status: "failed", path: "type", message: "type is required"})
  console.log(req.query)
  Journal.findOne({id: req.query.id, email: req.query.email}, (err, journal) => {
    if (err) return res.send({status: "error", message: err})
    if (!journal) {
      if (req.query.type == 1) {
        SessionBetaItem.findOne({_id: req.query.id}, (err, success) => {
          if (err) return res.send({status: "error", message: err})
          let payload = {
            email: req.query.email,
            id: req.query.id,
            type: 1,
            title: success.title,
            description: success.description,
            imageUrl: success.imageUrl,
            audioFile: success.audioFile
          }
          var journalSave = new Journal(payload)
          journalSave.save((err, saved) => {
            if (err || !saved) return res.send({status: "error", message: err})
            return res.send({status: "success", message: saved})
          })
        })
      } else if (req.query.type == 2) {
        Stories.findOne({_id: req.query.id}, (err, success) => {
          if (err) return res.send({status: "error", message: err})
          let payload = {
            email: req.query.email,
            id: req.query.id,
            type: 2,
            title: success.title,
            description: success.description,
            imageUrl: success.imageUrl,
            audioFile: success.audioFile
          }
          var journalSave = new Journal(payload)
          journalSave.save((err, saved) => {
            if (err || !saved) return res.send({status: "error", message: err})
            return res.send({status: "success", message: saved})
          })
        })
      } else return res.send({status: "failed", message: "type not exists"})
    } else {
      JournalItems.find({id: journal.id, email: req.query.email}, (err, success) => {
        console.log(success)
        if (err) return res.send({status: "error", message: err})
        var results = journal.toJSON()
        results.items = success
        return res.send({status: "success", message: results})
      })
    }
  })
}

module.exports = {
  getAllJournal,
  addJournal,
  updateJournal,
  removeJournal,
  getJournal
}