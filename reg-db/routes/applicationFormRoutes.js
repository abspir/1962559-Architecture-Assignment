const router = require('express').Router();
const ApplicationForm = require('../models/ApplicationForm');
const Course = require('../models/Course');
const User = require('../models/User');

let user;

//creating Registration Form
router.post('/', async(req, res)=> {
        try
        {
            const 
            { 
                name,
                email,
                password,
                dateOfBirth,
                addressLine,
                city,
                postcode,
                course,
                selectedEmployer,
                optInCommsPhone,
                optInCommsEmail,
                optInCommsSMS,
                qualifications,
                sortCode,
                accountNumber,
                bankName,
                ddconsent

            } = req.body;

            console.log(req.body);
            user = await User.create({
                name, 
                email, 
                password, 
                postcode, 
                city, 
                addressLine,
                dateOfBirth,
                role: "Applicant",
                selectedEmployer,
                optInCommsPhone,
                optInCommsEmail,
                optInCommsSMS
            });

            const applicationForm = await ApplicationForm.create({
                applicant: user._id, 
                course,
                status: "Pending - Qualifications Approval",
                qualifications,
                course,
                sortCode,
                accountNumber,
                bankName,
                ddconsent
            });
            
            user.applicationForm.push(applicationForm);
            
            await user.save();

            res.status(201).json(applicationForm);
        }
        catch (e)
        {
            let msg; 
            if(e.code == 11000)
            {
                msg = "User already exists"
            }
            else
            {
                msg = e.message;
                if (user) await User.deleteOne({_id: user._id});
            }
            console.log(e);
            res.status(400).json(msg)
        }
})

// login applicationForm

router.get('/', async(req, res) => {
    try {
        //const {email, password} = req.body;
        //const course = await Course.findByCredentials(email, password);
        //course.status = 'online';
        //await course.save();
        console.log('applications get through register');

        // const applications = await ApplicationForm.find({});

        const applications = await ApplicationForm.aggregate([
            {
                $lookup:
                {
                    from: "users",
                    localField: "applicant",
                    foreignField: "_id",
                    as: "applicant"
                }

            },
            { $unwind: "$applicant"},
            {
                $lookup:
                {
                    from: "courses",
                    localField: "course",
                    foreignField: "_id",
                    as: "course"
                }
            },
            { $unwind: "$course"}
        ])

        res.status(200).json(applications);
    }
    catch (e)
    {
        res.status(400).json(e.message)
    }
})

module.exports = router