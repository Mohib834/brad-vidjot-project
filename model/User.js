const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        validate(val){
            if(val.toLowerCase().includes('password')) throw new Error('Password include /"password/" keyword')
        }
    }
})

userSchema.pre('save', async function(req, res, next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8); 
    }
    next();
})

userSchema.methods.isValidPassword = async function(password){
    const user = this;
    return bcrypt.compare(password, user.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;