const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();



router.get("/balance",authMiddleware, async(req,res)=>{
    

    const account = await Account.findOne({
        userId: req.userId
    });

    res.status(200).json({
        balance: account.balance
    });
});

router.post("/transfer",authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    //Fetch the accounts with in the transaction

    const {amount, to} = req.body;
    console.log(to,amount);
    console.log(req.body);
    const account = await Account.findOne({userId: req.userId}).session(session);
    console.log(account);
    
    if(!account || !account.balance || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId: to}).session(session);
    console.log(toAccount);
    if(!toAccount){

        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        });
    }


    //perform the transfer:
    await  Account.updateOne({userId: req.userId}, { $inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

    //commit the transaction:
    await session.commitTransaction();
    res.status(200).json({
        message: "Transfer successful"
    })

})

module.exports = router;