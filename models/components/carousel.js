const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  images: [{
    url: String,
    caption: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Carousel', carouselSchema);
