const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const OrderRouter = require('./OrderRouter');
const PaymentRouter = require('./PaymentRouter');
const AiRouter = require('./AiRouter');
const DialogflowRouter = require('./DialogflowRouter');

// Chứa tất cả routes của API
const routes = (app) => {
	app.use('/api/user', UserRouter);
	app.use('/api/product', ProductRouter);
	app.use('/api/order', OrderRouter);
	app.use('/api/payment', PaymentRouter);
	app.use('/api/ai', AiRouter);
	app.use('/api/dialogflow', DialogflowRouter);
};

module.exports = routes;
