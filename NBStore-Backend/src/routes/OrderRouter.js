const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const {
	authUserMiddleware,
	authMiddleware,
	authOrderMiddleware,
} = require('../middleware/authMiddleware');

router.post('/create/:id', authUserMiddleware, OrderController.createOrder);
router.get(
	'/get-all-order/:id',
	authOrderMiddleware,
	OrderController.getAllOrderDetails
);
router.get(
	'/get-details-order/:id',
	authOrderMiddleware,
	OrderController.getDetailsOrder
);
router.delete(
	'/cancel-order/:id',
	authOrderMiddleware,
	OrderController.cancelDetailsOrder
);
router.get('/get-all-order', authMiddleware, OrderController.getAllOrder);

// Admin routes for order management
router.put('/approve/:id', authMiddleware, OrderController.approveOrder);
router.put('/reject/:id', authMiddleware, OrderController.rejectOrder);
router.put('/paid/:id', authMiddleware, OrderController.updateOrderPaid);
router.put(
	'/shipping/:id',
	authMiddleware,
	OrderController.updateOrderShipping
);
router.put(
	'/delivered/:id',
	authMiddleware,
	OrderController.updateOrderDelivered
);

module.exports = router;
