const express = require('express');
const userRouter = require('./user');
const accountsRouter = require('./accounts');
const router = express.Router();



//redirecting user routes to userRouter on user.js
router.use("/user",userRouter);
////redirecting user routes to userRouter on user.js
router.use("/account",accountsRouter)




module.exports = router