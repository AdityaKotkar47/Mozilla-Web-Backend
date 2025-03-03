
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    associatedPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog' || 'Event', // Reference to the blog or event
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model('Comment', commentSchema);