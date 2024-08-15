const node = require("node:fs");
const express = require("express");
const connectDB= require('./config/db');
const app = express();

connectDB();
app.use(express.json());

app.use('/api/mentors',require('./routes/mentor'));
app.use('/api/students',require('./routes/student'));

const PORT = 3000;
const HOSTNAME = "localhost";

app.listen(PORT,HOSTNAME,1,()=>{
    console.log(`app started at http://${HOSTNAME}:${PORT}`);
});