const Question = require('../models/questionModel');

// Add a vote to an option
exports.addVote = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findOne({ 'options._id': id });
    if (!question) return res.status(404).json({ error: 'Option not found' });
    const option = question.options.id(id);
    option.votes += 1;
    await question.save();
    res.status(200).json({ message: 'Vote added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an option
exports.deleteOption = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findOne({ 'options._id': id });
    if (!question) return res.status(404).json({ error: 'Option not found' });
    const option = question.options.id(id);
    if (option.votes > 0) {
      return res.status(400).json({ error: 'Cannot delete option with votes' });
    }
    option.remove();
    await question.save();
    res.status(200).json({ message: 'Option deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
