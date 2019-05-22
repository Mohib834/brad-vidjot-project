const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    detail:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;