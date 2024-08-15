const mongoose = require('mongoose');

const connectDB= async()=>{
    try{
        await mongoose.connect('mongoose://localhost:27017/mentorStudentDB',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('mongoDB connected...');
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;