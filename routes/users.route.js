const express = require('express');
const router = express.Router();
const multer = require('multer');
var upload = multer({ dest: './public/uploads/' });

var cloudinary = require('cloudinary').v2;

const usersController = require('../controllers/users.controller');
const validate = require('../validate/userCreate.validate');

router.get('/', usersController.index);

// Search User
router.get('/search', usersController.search);

// Create User
router.get('/create', usersController.create);

router.post('/create', validate.userCreate, usersController.postCreate);

// View User
router.get('/:id/view', usersController.view);

// Edit User
router.get('/:id/edit', usersController.edit);

router.post('/:id/edit', usersController.postEdit);

// Delete User
router.get('/:id/delete', usersController.delete);

// Update profile
router.get('/profile', usersController.profile);

router.post('/profile', upload.single('avatar'), validate.userCreate, usersController.postProfile);

module.exports = router;