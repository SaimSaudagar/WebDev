// models/ContentItem.js
const mongoose = require('mongoose');

const contentItemSchema = new mongoose.Schema({
  componentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'content.componentType'
  },
  componentType: {
    type: String,
    required: true,
    enum: ['TextBlock', 'Image', 'CTAButton']
  }
}, { _id: false });

module.exports = contentItemSchema;
