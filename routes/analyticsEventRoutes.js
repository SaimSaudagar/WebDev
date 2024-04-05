const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  
} = require('../controllers/analyticsEventController');


module.exports = router;
