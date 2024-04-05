const express = require('express');
const router = express.Router();
const AnalyticsEvent = require('../models/AnalyticsEvent');

exports.trackEvent = async (req, res) => {
  try {
    const { pageSlug, eventType, eventData } = req.body;
    const event = new AnalyticsEvent({ pageSlug, eventType, eventData });
    await event.save();
    res.status(201).send('Event tracked successfully');
  } catch (error) {
    res.status(400).send('Error tracking event');
  }
};

exports.pageViews = async (req, res) => {
    const pageViews = await AnalyticsEvent.countDocuments({ eventType: 'pageView' });
    res.json({ pageViews });
};