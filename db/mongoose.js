const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://webdev:MOHIB@mohib28@cluster0-ir48n.mongodb.net/test',{
    useCreateIndex:true,
    useNewUrlParser:true
})
.then(() => {
    console.log('DB connected');
})
.catch(e => {
    console.log({error:e})
})