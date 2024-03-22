const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
  size: {
    width: { type: Number, required: true, default: 400 },
    height: { type: Number, required: true, default: 300 }
  },
  alignment: {
    type: String,
    default: 'center',
    enum: ['left', 'center', 'right'],
  },
  page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);
