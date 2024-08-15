const express = require('express');
const router  = express.Router();
const student = require('../models/student');
const mentor = require ('../models/mentor');

router.post('/create',async (req,res)=>{
    const{name}=req.body;
    try{
        const student = new student({name});
        await student.save();
        res.json(student);
    }
    catch(err){
        res.status(500).send('server error');
    }
});


router.put('/:studentId/assign_mentor',async(req,res)=>{
    const{studentId}= req.params;
    const {mentorId}=req.body;

    try{
        const student = await student.findById(studentId);
        if(!student) 
            return res.status(404).json({ msg:'student not found' });

        student.previousMentors.push(student.mentor);
        student.mentor = mentorId;

        await student.save();
        res.json(student);
    }
    catch(err){
        res.status(500).send('server error');
    }
});



router.get('/:studentId/previous-mentors',async (req,res)=>{
    const{studentId} = req.params;

    try{
        const student = await student.findById(studentId).popiulate('previousMentors');
        if(!student)
            return res.status(404).json({ msg: 'student not found' });

        res.json(student.previousMentor);
    }
    catch(err){
        res.status(500).send('server error');
    }
});

module.exports = router;