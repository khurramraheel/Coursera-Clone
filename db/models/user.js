let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    userType:String,
    profession:String,
    userImage:String,
    enrolledCourses:[Object]
})

module.exports = mongoose.model("users",userSchema);