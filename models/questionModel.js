const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 }
});

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  options: [OptionSchema]
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
