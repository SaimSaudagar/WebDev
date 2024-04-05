const mongoose = require('mongoose');

const emailCampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  recipientList: [{
    type: String,
    required: true
  }],
  sent: {
    type: Boolean,
    default: false
  },
  sentAt: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('EmailCampaign', emailCampaignSchema);
