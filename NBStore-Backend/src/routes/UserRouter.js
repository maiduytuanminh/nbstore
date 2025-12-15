const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const {
	authMiddleware,
	authUserMiddleware,
} = require('../middleware/authMiddleware');

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.post('/log-out', userController.logoutUser);
router.put('/update-user/:id', authUserMiddleware, userController.updateUser);
router.delete(
	'/delete-user/:id',
	authUserMiddleware,
	userController.deleteUser
); // chỉ có isAdmnin mới được delete
router.get('/get-all-user', authMiddleware, userController.getAllUser); // Chỉ có isAdmin mới được xem getAll
router.get(
	'/get-details/:id',
	authUserMiddleware,
	userController.getDetailsUser
);
router.post('/refresh-token', userController.refreshToken); // Token hết hạn thì cấp token mới
router.post('/delete-many', authMiddleware, userController.deleteMany);

module.exports = router;
