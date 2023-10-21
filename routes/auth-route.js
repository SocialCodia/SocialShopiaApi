const router = require('express').Router();
const authController = require('../controllers/auth-controller');
const am = require('../middlewares/async-middleware');
const { auth } = require('../middlewares/auth-middleware');

router.post('/register', am(authController.register));
router.post('/verify', am(authController.verify));
router.post('/login', am(authController.login));
router.post('/google', am(authController.google));
router.post('/facebook', am(authController.facebook));
router.post('/forgot', am(authController.forgot));
router.post('/reset', am(authController.reset));
router.post('/refresh', am(authController.refresh));
router.get('/logout', auth, am(authController.logout));
router.post('/logout-all', auth, am(authController.logoutAll));



module.exports = router;