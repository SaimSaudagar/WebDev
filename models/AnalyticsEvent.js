const mongoose = require('mongoose');

const analyticsEventSchema = new mongoose.Schema({
  pageSlug: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    enum: ['pageView', 'formSubmit', 'click'],
    required: true
  },
  eventData: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AnalyticsEvent', analyticsEventSchema);
