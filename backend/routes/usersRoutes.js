const express = require('express');
const usersController = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');
const {
  updateProfileValidation,
  updateAvatarValidation,
  getUserByIdValidation,
} = require('../middlewares/validation');

const router = express.Router();

router.get('/', authMiddleware, usersController.getUsers);
router.get('/me', authMiddleware, usersController.getCurrentUser);
router.patch('/me', authMiddleware, updateProfileValidation, usersController.updateProfile);
router.patch('/me/avatar', authMiddleware, updateAvatarValidation, usersController.updateAvatar);
router.get('/:userId', authMiddleware, getUserByIdValidation, usersController.getUserById);

module.exports = router;
