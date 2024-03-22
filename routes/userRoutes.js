const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers
} = require('../controllers/userController');

router.post('/', authMiddleware, createUser);
router.get('/:id', authMiddleware, getUser);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);
router.get('/', authMiddleware, getAllUsers);

module.exports = router;
