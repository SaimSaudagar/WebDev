const mongoose = require('mongoose');

const textBlockSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  font: {
    type: String,
    required: true,
    default: 'Arial',
  },
  size: {
    type: Number,
    required: true,
    default: 16,
  },
  color: {
    type: String,
    required: true,
    default: '#000000', // Default color is black
  },
  alignment: {
    type: String,
    required: true,
    default: 'left', // Default alignment is left
    enum: ['left', 'center', 'right', 'justify'],
  },
  page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('TextBlock', textBlockSchema);
