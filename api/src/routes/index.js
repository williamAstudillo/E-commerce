const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const searchRouter = require('./search.js');
const userRouter = require('./user.js');
const orderRouter = require('./order.js');
const authRouter = require('./authentication.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products/category', categoryRouter);
router.use('/products', productRouter);
router.use('/search', searchRouter);
router.use('/auth', authRouter);
router.use('/orders', orderRouter);
router.use('/users', userRouter);

module.exports = router;
