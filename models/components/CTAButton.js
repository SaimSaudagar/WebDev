const mongoose = require('mongoose');

const ctaButtonSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#007bff', // Default Bootstrap primary button color
  },
  fontSize: {
    type: Number,
    default: 16, // Default font size in pixels
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

module.exports = mongoose.model('CTAButton', ctaButtonSchema);
