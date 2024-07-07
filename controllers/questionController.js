const Question = require('../models/questionModel');

// Create a new question
exports.createQuestion = async (req, res) => {
  const { title } = req.body;
  try {
    const question = new Question({ title });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add an option to a question
exports.addOption = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    question.options.push({ text });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    if (question.options.some(option => option.votes > 0)) {
      return res.status(400).json({ error: 'Cannot delete question with votes' });
    }
    await question.remove();
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// View a question with its options and votes
exports.viewQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    const response = {
      id: question._id,
      title: question.title,
      options: question.options.map(option => ({
        id: option._id,
        text: option.text,
        votes: option.votes,
        link_to_vote: `http://localhost:8000/options/${option._id}/add_vote`
      }))
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
