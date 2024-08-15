const express = require('express');
const router = express.Router();
const mentor = require('../models/mentore');
const student = require('../models/student');

router.post('/create',async (req,res)=>{
    const{name}=req.body;
    try{
        const mentor = new mentor({name});
        await mentor.save();
        res.json(mentor);
    }
    catch(err){
        res.status(500).send('server error');
    }
});

router.post('/:mentorId/assign',async(req,res)=>{
    const{mentorId}=req.params;
    const{studentIds}=req.body;

    try{
        const mentor = await mentor.findById(mentorId);
        if(!mentor)
            return res.status(404).json({msg:'mentor not found'});

        await student.updateMany(
            {_id:{$in: studentIds},mentor:null},
            {$set:{mentor:mentorId},$push:{previousMentors:mentorId} }
        );

        mentor.students.push(...studentIds);
        await mentor.save();

        res.json(mentor);
    }
    catch(err){
        res.status(500).send('server error');
    }
});

router.get('/:mentorId/students',async(req,res)=>{
    const{mentorId}= req.params;
    try{
        const mentor= await mentor.findById(mentorId).populate('students');
        if(!mentor)
            return res.status(404).json({msg:'mentor not found'});

        res.json(mentor.students);
    }
    catch(err){
        res.status(500).send('server error');
    }

});



module.exports= router;