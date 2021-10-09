const JournalQuestion = require("../models/journalQuestion.model");
const JournalItems = require("../models/journalItem.model");

function getAllJournalQuestion (req, res) {
  let query = {}
  let page = -1
  var sortValue = 'createdOn'
  var sort = 0
  var limit = 10
  if (req.query.limit) limit = Number(req.query.limit) 
  if (req.query.page) page = req.query.page
  JournalQuestion.paginate(query, {page: page, sort: { [sortValue]: sort}, limit: limit}, (err, success) => {
    if (err) return res.send({ status: "error", message: err })
    if (!success) return res.send({ status: "failed", message: "No record found" })
    return res.send({ status: "success", message: success })
  })

}

function getAllJournalQuestionForUser (req, res) {
  if (!req.query.email) return res.send({status: "failed", query: "email", message: "Email is required"})
  let query = {}
  let page = -1
  var sortValue = 'createdOn'
  var sort = 0
  var limit = 10
  if (req.query.limit) limit = Number(req.query.limit) 
  if (req.query.page) page = req.query.page
  if (req.query.type) query.type = req.query.type
  let arrayOfEmails = []
  JournalItems.find({email: req.query.email, id: req.query.id}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    console.log(success)
    success.forEach((item) => {
      arrayOfEmails.push(item.questionId)
    })
    query._id = {$nin: arrayOfEmails}
    JournalQuestion.paginate(query, {page: page, sort: { [sortValue]: sort}, limit: limit}, (err, success) => {
      if (err) return res.send({ status: "error", message: err })
      if (!success) return res.send({ status: "failed", message: "No record found" })
      return res.send({ status: "success", message: success })
    })
  })
}

function addJournalQuestion (req, res) {
  if (!req.body.question || req.body.question === "") return res.send({status: "failed", path: "question", message: "Question is required"})
  if (req.body.type > 5) return res.send({status: "failed", path: "type", message: "Type is less then 5"})
  const journalQuestion = new JournalQuestion(req.body)
  journalQuestion.save((err, success) => {
    if (err) return res.send({ status: "error", message: err })
    return res.send({ status: "success", message: success })
  })
}

function updateJournalQuestion (req, res) { 
  if (!req.body._id) return res.send({status: "failed", path: "_id", message: "_id is required"})
  if (!req.body.question || req.body.question === "") return res.send({status: "failed", path: "question", message: "Question is required"})
  let query = {
    $set: {
      question: req.body.question
    }
  }
  JournalQuestion.findOneAndUpdate({_id: req.body._id}, query, {new: true}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: success})
  })
}

function removeJournalQuestion (req, res) {
  if (!req.body._id) return res.send({status: "failed", path: "_id", message: "_id is required"})
  JournalQuestion.remove({_id: req.body._id}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: "Record Deleted"})
  })
}

function getJournalQuestion (req, res) {
  if (!req.query._id) return res.send({status: "failed", query: "_id", message: "_id is required"})
  JournalQuestion.findOne({_id: req.query._id}, (err, success) => {
    if (err) return res.send({status: "error", message: err})
    return res.send({status: "success", message: success})
  })
}

module.exports = {
  getAllJournalQuestion,
  addJournalQuestion,
  updateJournalQuestion,
  removeJournalQuestion,
  getJournalQuestion,
  getAllJournalQuestionForUser
}