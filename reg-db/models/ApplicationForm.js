const { Schema, model} = require('mongoose');
// const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');
// const User = require('../models/User');
// const Course = require('../models/Course');

const ApplicationFormSchema = new Schema({
    applicant : { type: Schema.Types.ObjectId, ref: "User"},
    course : { type: Schema.Types.ObjectId, ref: "Course"},
    status: {
        type: String, 
        //Admission Lectuer verifies qualification
        //Admission Officer verifies personal details cbr etc
        enum: [
            "Pending - Qualifications Approval", 
            "Pending - Personal Details Approval", 
            "Pending - Payment Approval",  
            "Approved",
            "Rejected"
        ]
    },
    qualifications : {
        type: String,
        required: [true, "Qualifications required"]
    },
    sortCode: {
        type: String,
        required: [true, "Can't be blank"]
    },
    accountNumber: {
        type: String,
        required: [true, "Can't be blank"]
    },
    bankName: {
        type: String,
        required: [true, "Can't be blank"]
    },
    ddconsent: {
        type: Boolean,
        required: [true, "Can't be blank"]
    }
}, {minimize: false});

// //can't switch to arrow
// UserSchema.pre('save', function (next){
//     const user = this;
//     if(!user.isModified('password')) return next();

//     bcrypt.genSalt(10, (err, salt) => {
//         if(err) return next(err);

//         bcrypt.hash(user.password, salt, (err, hash) =>{
//             if(err) return next(err);

//             user.password = hash

//             next();
//         })

//     })
// })
//can't switch to arrow
// ApplicationFormSchema.methods.toJSON = function (){
//     const user = this;
//     const userObject = user.toObject();
//     //remove password before sending user details
//     delete userObject.password;
//     return userObject;
// }

// UserSchema.statics.findByCredentials = async (email, password) =>
// {
//     const user = await User.findOne({email});
//     if(!user) throw new Error('invalid email or password');

//     const isMatch = await bcrypt.compare(password, user.password);
//     if(!isMatch) throw new Error('invalid email or password')
//     return user
// }

ApplicationFormSchema.methods.setStatus = async function (status)
{
    const application = this;
    application.status = status;
    await course.save();
}

const ApplicationForm = model('ApplicationForm', ApplicationFormSchema);

module.exports = ApplicationForm