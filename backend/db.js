const mongoose = require('mongoose'); 

async function connectToMongodb(){
    try{
        mongoose.connect('mongodb+srv://Sadiq:sadiq111@cluster0.dbq0pen.mongodb.net/paytm');
        console.log('Database connected...');
    }
    catch(err){
        console.log(err)
    }
}

connectToMongodb()
//creating schema for users:

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

//Creating the account schema:



//Creating a User model:
const User = mongoose.model('User',userSchema);

const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true

    },
    balance:{
        type: Number,
        required: true
    }
})


//Creating a account model(Table):
const Account = mongoose.model('Account',accountSchema);





module.exports = {
    User,
    Account
}