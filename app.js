const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
let express = require('express');
let mongoose = require('mongoose');
const multer = require('multer');
// const uuid = require('uuid').v4;
const {upload,uploadVideos,uploadCourseVideo} =require('./s3Service/s3Service');
let User = require('./db/models/user');
let courses = require('./db/models/course');

let coursesData=[];

const PORT = process.env.PORT || 5000;
const DB = process.env.DATABASE_URI;


let jsonwebtoken = require('jsonwebtoken');
let app = express();

let cors = require('cors');


app.use(cors());
app.use(express.json());

const connectDB=()=>{
    mongoose.connect(DB, (err, connection)=>{

    if(connection){
        console.log("Database Connected");
    }
    else{
        console.log(err);
    }
    })
}

connectDB();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "server/profileImage");
//     },
//     filename: (req, file, cb) => {
//         const { originalname } = file;
//            cb(null, `${req.body.name}-${originalname}`);
//     },
//   });
// const upload = multer({ storage:storage });


  

// working code
// const storage = multer.memoryStorage();

// const upload =multer ({storage});


// app.post("/signup",upload.single('userImage'), async(req,resp)=>{
// try{
//     const file = req.file
//     const results = await s3Uploadv3(file);
//     console.log(results);
//     console.log(file);
//     let user =new User(req.body);
//     let result = user.save({user,userImage:results.location});
//     resp.send(result);
// }catch(err){
//     console.log(err);
// }
// })


app.post("/signup",upload.single('userImage'), async(req,resp)=>{
try{
    
    // const results = await req.file;
    // console.log(results);
    // console.log(results);
    // console.log(req.file.location);
    console.log(req.body);
    console.log(req.file);
    let userpic= await req.file.location;
    let user =new User(req.body);
    user.userImage=userpic;
    console.log(user.userImage);
    let useremail =await User.findOne({email:req.body.email});
    if(useremail){
        resp.send("User Already Exists");
        console.log("User Already Exists");
    }
    else{
        await user.save(user);
        await resp.send({result:user});
    }

    // User.findOneAndUpdate({name:req.body.name},{userImage:userpic},(err,data)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log(data);
    //     }
    // })
        }catch(err){
            console.log(err);
        }
        })


app.post('/login', async (req, resp)=>{

    let user =  await User.findOne(req.body);
    console.log(user);
   
             if(user){

                    jsonwebtoken.sign({
                        id:user._id
                    },"FSD m cat says mioon", {
                        expiresIn:"2h"
                    }, (err, UserToken)=>{
                        resp.json({
                            token:UserToken,
                            user:user
                        });
                    })

            }else{
                    resp.json("User Not Found");
                    console.log("m")
                }


 });

 app.get('/session-check-karo', async (req, res)=>{

    try{

        let data = await jsonwebtoken.verify(req.query.token, "FSD m cat says mioon")

        let user = await User.findById(data.id);

        // let user = users.find(user=>user.id == data.id);
        
        res.json(user);
    }catch(e){
        res.json(null);
    }

});



app.post('/user/:id/AddCourse',uploadCourseVideo.single('courseImage') ,async (req,resp)=>{

    const id = req.params.id;
    console.log(req.body);
    console.log(req.file);
    try{
        let coursepic= req.file.location;
        const newCourse = new courses(req.body);
        console.log(newCourse)
        newCourse.courseImage = coursepic;
        console.log(newCourse.courseImage);
        await newCourse.save(newCourse);
        // return res.json({
        //     message: "Course Created",
        //     newCourse
        // })
        await resp.send({result:newCourse});
    }
    catch{
        console.log("error");
    }


})

 app.post('/course/:id/AddModules',uploadVideos.array('videos'),async (req,res)=>{

    let id=req.params.id
    console.log(id)
    let modulesData = req.body;
    // videodata=await req.files;

    const file = req.files.map((file)=>{
        return file.location;
    });
    // const results = await s3Uploadv3(file);
    console.log(file);
    // const videodata=modulesData.videos = req.file.location;
    // console.log(videodata);
    // console.log(req.files.originalname);
    console.log(modulesData);
    // let uservideos= req.file.location;
    try{
        const course = await courses.findById(id)
       
        // course.ModulesSeries.videos = uservideos;
        // course.ModulesSeries.v0ideos.push(videodata);
        modulesData.videos=file;
        course.ModulesSeries.push(modulesData);
        await course.save()
        return res.json({
            message: "Course Created",
            course
        })
    }
    catch(e){
        console.log(e);
    }
})


    app.post('/enrolledCourses/:courseid/user/:userid', async(req,res)=>{

                const courseid = req.params.courseid;
                const userid = req.params.userid;
                console.log(req.body)
                try{
                    let userData =await  User.findById(userid);
                    userData.enrolledCourses.push(req.body);
                    await userData.save();
                    res.json(userData);
                    }
                catch(e){
                res.json(e);
                console.log(e)
                }
            })

            
            app.post('/unenrolledCourses/:courseid/user/:userid', async(req,res)=>{

                const courseid = req.params.courseid;
                const userid = req.params.userid;
                try{
                    let userData =await  User.findById(userid);
                   let index= userData.enrolledCourses.filter(enroll=> enroll._id != courseid)
                    console.log(index)
                    userData.enrolledCourses = index;
                   await userData.save();
                    res.json(userData);
                    }
                catch(e){
                res.json(e.message);
                }
            
            })

            
            app.get('/allCourses', async(req,res)=>{
            let coursesData = await courses.find();
            
            try{
                    res.json(coursesData);
            }
            catch{
                console.log("no course found");
            }
            })


            app.get('/allUsers', async(req,res)=>{
                let users = await User.find();
        
                try{
                    res.json(users);
                }
                catch(e){
                console.log(e);
                res.json(e)
                }

            })


        app.get('/singleCourse', async(req, res)=>{
             console.log(req.query.courseid)
            let singleCourse = await courses.findById(req.query.courseid);
            res.json(singleCourse);
             console.log(singleCourse)
        });


        app.get('/userCourses', async(req, res)=>{
                
            let userCourses = await courses.find({userID:req.query.userid});
            console.log(userCourses)
            res.json(userCourses);

        });


        app.get('/CurrentUser/:id', async(req, res)=>{  
            let id =req.params.id              
            let user= await User.findOne({_id:id});
            console.log(user)
            res.json(user);
        });


        app.get('/CurrentCourse', async(req, res)=>{  
            let id =req.query.id        
            console.log(req.query.id)    
            let course= await courses.findOne({_id:id});
            console.log(course)
            res.json(course);
        });


        app.delete('/delete-user/:id', async(req,res)=>{

            try{
                await User.findByIdAndDelete(req.params.id);
                let courseDelete = await courses.find();
              let deleteCourse=  courseDelete.map((course)=>
                                {
                                    if(course.userID == req.params.id){
                                       return  course.deleteOne();
                                    }
                                })
                                res.json(deleteCourse);
                }
                catch(e){
                    res.send(e);
                }
            
            })
        

        app.delete('/delete-course/:id', async(req,res)=>{

            try{
            let deleteCourse = await courses.findByIdAndDelete(req.params.id);
            if(!req.params.id){
                return res.status(400).send("id not found");
            }
            res.send(deleteCourse);
            }
            catch{
                res.status(500).send("no course found");
            }
        
        })



        app.get('/totalCourses',async(req,res)=>{
            let TotalCourses = await courses.find().countDocuments()
        try{
            res.json(TotalCourses);
        }
        catch{
            res.json("no courses Found");
        }
        })

        app.get('/totalUsers',async(req,res)=>{
            let TotalUsers = await User.find().countDocuments()
        try{
            res.json(TotalUsers);
        }
        catch{
            res.json("no Users Found");
        }
        })



//      app.get('/userCourses', async(req, res)=>{
           
//             console.log(req.body)
//             let userCourses = await courses.find({userID:req.body._id});
//             console.log(userCourses)
//             try{
//                 res.json(userCourses);
//            }
//            catch(e){
//             console.log(e);
//            }        
// });

// heroku deployment Code (comment it )

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(PORT,()=>{
    console.log(`Server is runing at ${PORT}`);
})