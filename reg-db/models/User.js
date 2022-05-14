const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String, 
        required: [true, "Can't be blank"]
    },
    email: {
        type: String, 
        lowercase: true, 
        unique: true, 
        required: [true, "Can't be blank"],
        index: true,
        validate: [isEmail, "invalid email"]
    },
    password: {
        type: String, 
        required: [true, "Can't be blank"]
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Can't be blank"]
    },
    addressLine: {
        type: String,
        required: [true, "Can't be blank"]
    },
    city: {
        type: String,
        required: [true, "Can't be blank"]
    },
    postcode: {
        type: String,
        required: [true, "Can't be blank"]
    },
    role: {
        type: String, 
        //Admission Lectuer verifies qualification
        //Admission Officer verifies personal details cbr etc
        enum: ["Admissions Lecturer", "Admissions Officer", "Student", "Applicant"],
        default: "Applicant"
    },
    selectedEmployer: {
        type: String,
    },
    optInCommsPhone: {
        type: Boolean,
        default: false,
    },
    optInCommsEmail: {
        type: Boolean,
        default: false,
    },
    optInCommsSMS: {
        type: Boolean,
        default: false,
    },
    applicationForm : [{ type: Schema.Types.ObjectId, ref: "ApplicationForm"}]
}, {minimize: false});
//can't switch to arrow
UserSchema.pre('save', function (next){
    const user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) =>{
            if(err) return next(err);

            user.password = hash

            next();
        })

    })
})
//can't switch to arrow
UserSchema.methods.toJSON = function (){
    const user = this;
    const userObject = user.toObject();
    //remove password before sending user details
    delete userObject.password;
    return userObject;
}

UserSchema.statics.findByCredentials = async (email, password) =>
{
    const user = await User.findOne({email});
    if(!user) throw new Error('invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('invalid email or password')
    return user
}

const User = model('User', UserSchema);

module.exports = User