// models/Page.js
const mongoose = require('mongoose');
const contentItemSchema = require('./ContentItem'); // Make sure the path is correct

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: [contentItemSchema] // This should work if contentItemSchema is a Mongoose schema
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);
