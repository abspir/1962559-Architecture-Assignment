const router = require('express').Router();
const Course = require('../models/Course');
const User = require('../models/User');
const ApplicationForm = require('../models/ApplicationForm');
const ObjectId = require('mongodb').ObjectId;

//creating course
router.post('/', async(req, res)=> {
        try
        {
            const { name, description, level, durationInYears, annualCost } = req.body;
            console.log(req.body);
            const course = await Course.create({name, description, level, durationInYears, annualCost});
            res.status(201).json(course);
            
            // console.log(await User.find({email: 'realuser@example.com'}));
            // await ApplicationForm.findOne({
            //     _id: ObjectId("627323b3e0920e5388082a5a")
            // })
            // .populate('applicant', 'name email addressLine city postcode')
            // .then((res)=>{
            //     console.log(res);
            // }).catch((e)=>{
            //     console.error(e);
            // })
        }
        catch (e)
        {
            let msg; 
            if(e.code == 11000)
            {
                msg = "Course already exists"
            }
            else
            {
                msg = e.message;
            }
            console.log(e);
            res.status(200).json(msg)
        }
})

// return all documents from courses collection

router.get('/', async(req, res) => {
    try {
        //const {email, password} = req.body;
        //const course = await Course.findByCredentials(email, password);
        //course.status = 'online';
        //await course.save();
        const course = await Course.find({});
        res.status(200).json(course);
    }
    catch (e)
    {
        res.status(400).json(e.message)
    }
})

module.exports = router