const { Schema, model } = require('mongoose');

const CourseSchema = new Schema({
    name: {
        type: String, 
        required: [true, "Can't be blank"]
    },
    description: {
        type: String,
        required: [true, "Can't be blank"]
    },
    level: {
        type: String, 
        //Admission Lectuer verifies qualification
        //Admission Officer verifies personal details cbr etc
        enum: ["Level 5 - Foundation", "Level 6 - Bachelors", "Level 7 - Masters", "Level 8 - Doctorate"],
        required: [true, "Can't be blank"]
    },
    durationInYears: {
        type: String, 
        required: [true, "Can't be blank"]
    },
    annualCost: {
        type: String, 
        required: [true, "Can't be blank"]
    },
}, {minimize: false});



CourseSchema.methods.getCourseID = async function()
{
    const course = this;
    return course._id;
}

CourseSchema.methods.editDescription = async function (description)
{
    const course = this;
    course.description = description;
    await course.save();
}

const Course = model('Course', CourseSchema);

module.exports = Course