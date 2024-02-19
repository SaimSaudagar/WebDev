const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createRole,
  getRole,
  updateRole,
  deleteRole,
} = require('../controllers/roleController');

router.post('/', authMiddleware, createRole);
router.get('/:id', authMiddleware, getRole);
router.put('/:id', authMiddleware, updateRole);
router.delete('/:id', authMiddleware, deleteRole);

module.exports = router;
