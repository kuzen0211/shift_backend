const express = require('express');
const router = express.Router();
const { registerValidator, loginValidator, emailValidator } = require('../utils/index');
const { validation, authenticate, upload } = require('../middlewares');
const ctrl = require('../controllers/auth/auth');

// signup
router.post('/register', validation(registerValidator), ctrl.register);

// signin
router.post('/login', validation(loginValidator), ctrl.login);

//verification
router.get('/verify/:verificationCode', ctrl.verifyEmail);

//re-verification
router.post('/verify', validation(emailValidator), ctrl.resendVerifyEmail);

//current
router.get('/current', authenticate, ctrl.getCurrent);

//logout
router.post('/logout', authenticate, ctrl.logout);

//upload avatar
router.patch('/avatar', authenticate, upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;
