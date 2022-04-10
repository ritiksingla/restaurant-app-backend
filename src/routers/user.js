const express = require('express');
const router = express.Router();
const {checkAuth} = require('../middlewares/checkAuth');
const UserController = require('../controllers/user');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);

module.exports = router;