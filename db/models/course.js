let mongoose = require("mongoose");

let ModuleSchema = mongoose.Schema({
    moduleName:String,
    videos:[String]
})


let courseSchema = mongoose.Schema({
    courseName:String,
    description:String,
    userID:String,
    category:String,
    courseImage:String,
    ModulesSeries:[ModuleSchema]
})

module.exports = mongoose.model("courses",courseSchema);
