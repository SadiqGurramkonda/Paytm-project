const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { User, Account} = require('../db');
const { JWT_SECRET } = require('../config');
const router = express.Router();

const signupBody = zod.object({
    username : zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()

});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});



//here the actual user route logics reside
router.post('/signup',async(req,res)=>{

    const userDetails = req.body;
    const {success} = signupBody.safeParse(userDetails);
    if(!success){
        res.status(411).json({
            msg: 'Incorrect inputs'
        })
        return
    }

    const existingUser = await  User.findOne({
        username: userDetails.username
    })
    if(existingUser){
        res.status(411).json({
            msg: 'Email already taken'
        })
        return
    }

    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
    const userId = user._id;
    
        await Account.create({
            userId,
            balance: 1+ Math.floor((Math.random() * 10000))
    
        })

        const token = jwt.sign({
            userId: userId,
        },JWT_SECRET)
    
        res.status(200).json({
            msg:'user created Sucessfully',
            token: token
        })
        
    } catch (err) {
        return res.json({
            message: err
        })    
    };
});

router.get('/siginin',async(req,res)=>{
    const sigininDetails = req.body;
    console.log(req.body);
    const {success} = signinBody.safeParse(sigininDetails);
    if(!success){
        res.status(411).json({
            message: "Incorrect inputs"
        })
        return;
    }
    const user = await User.findOne({
        username: sigininDetails.username,
        password: sigininDetails.password
    });

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })
})

router.get('/bulk',async(req,res)=>{
    const filter = req.query.filter.trim() || "";
    //console.log(req.query.filter)
    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        },
        {
            lastname:{
                "$regex": filter
            }
        }
        ]
    })
    res.json({
        users: [
            users.map((user)=>({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname
            }))
        ]
    })
})
module.exports = router;